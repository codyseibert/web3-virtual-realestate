import './App.css';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import configuration from './UselessSquares.json';
import { Header } from './Header';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contractObj = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

function App() {
  const [account, setAccount] = useState();
  const [plots, setPlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState({});
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [rates, setRates] = useState(1);
  const [salePrice, setSalePrice] = useState();
  const [showSellModal, setShowSellModal] = useState(false);

  const refreshPlots = async () => {
    const allPlots = [];
    for (let i = 0; i < 28; i++) {
      allPlots.push({
        ...(await contractObj.methods.plots(i).call()),
        id: i,
      });
    }
    console.log(allPlots);
    setPlots(allPlots);
  };

  useEffect(() => {
    async function load() {
      const rates = await fetch(
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD'
      ).then((response) => response.json());
      setRates(rates.ETH / rates.USD);
      const accounts = await web3.eth.requestAccounts();
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      await refreshPlots();
    }

    load();
  }, []);

  const buyPlot = async () => {
    await contractObj.methods
      .buyPlot(
        selectedPlot.id,
        web3.utils.asciiToHex(text),
        parseInt(color, 16)
      )
      .send({
        from: account,
        value: selectedPlot.salePrice,
      });
    await refreshPlots();
    setShowModal(false);
  };

  const numberToColorHex = (number) => {
    const hex = parseInt(number).toString(16);
    return `000000${hex}`.slice(-6);
  };

  const setPlotPrice = async () => {
    await contractObj.methods
      .setPlotPrice(
        selectedPlot.id,
        `${parseInt(salePrice * rates * 1e18)}`
      )
      .send({ from: account });
    setShowSellModal(false);
    await refreshPlots();
  };

  const weiToUsd = (wei) => {
    return (wei / rates / 1e18).toFixed(2);
  };

  const WIDTH = 220;
  const SIZE = 150;
  const ROWS = 4;

  const getLeft = (id) => {
    const row = Math.floor(id / ROWS);
    const isOdd = row % 2 === 1;
    return (
      (id % ROWS) * WIDTH + (isOdd ? WIDTH : WIDTH / 2)
    );
  };

  const getTop = (id) => {
    return (Math.floor(id / ROWS) * WIDTH) / 4;
  };

  return (
    <div>
      <Header account={account} />

      <Container>
        <Row>
          <Col>
            <h2 className="mb-4 mt-4">
              Own your own useless colored square.
            </h2>

            <div className="plots">
              <div className="plots__wrapper">
                {plots.map((plot) => (
                  <div
                    key={plot.id}
                    style={{
                      backgroundColor: `#${numberToColorHex(
                        plot.color
                      )}`,
                      left: getLeft(plot.id),
                      top: getTop(plot.id),
                      width: SIZE,
                      height: SIZE,
                    }}
                    className="plots_plot"
                  >
                    <h3>{plot.text}</h3>
                    {plot.owner === account &&
                      plot.salePrice !== '0' && (
                        <h5>
                          listed for $
                          {weiToUsd(plot.salePrice)}
                        </h5>
                      )}

                    {plot.salePrice !== '0' &&
                      plot.owner !== account && (
                        <Button
                          variant="success"
                          onClick={() => {
                            setSelectedPlot(plot);
                            setShowModal(true);
                          }}
                        >
                          Buy $
                          {(
                            plot.salePrice /
                            1e18 /
                            rates
                          ).toFixed(2)}
                        </Button>
                      )}

                    {plot.owner === account && (
                      <Button
                        variant="danger"
                        onClick={() => {
                          setSelectedPlot(plot);
                          setShowSellModal(true);
                        }}
                      >
                        {plot.salePrice === '0'
                          ? 'List for Sell'
                          : 'Change List Price'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Buy Plot #{selectedPlot.id}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control
                onChange={(e) => setText(e.target.value)}
                type="text"
                maxLength="7"
                value={text}
                placeholder="ヽ(´▽`)/"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                onChange={(e) => setColor(e.target.value)}
                type="text"
                value={color}
                placeholder="00ff00"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={buyPlot}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSellModal}
        onHide={() => setShowSellModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            List Plot for Sell #{selectedPlot.id}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>WEI: {salePrice * rates * 1e18}</p>
          <p>ETH: {salePrice * rates}</p>
          <p>USD: {salePrice}</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>List Price</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setSalePrice(e.target.value)
                }
                type="text"
                value={salePrice}
                placeholder="$40.00"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSellModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={setPlotPrice}>
            List
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;