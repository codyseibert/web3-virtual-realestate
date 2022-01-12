import './App.css';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import configuration from '../build/contracts/UselessSquares.json';
import { Header } from './components/Header';
import { PlotPriceModal } from './components/PlotPriceModal';
import { BuyPlotModal } from './components/BuyPlotModal';
import { Squares } from './components/Squares';
import { Col, Container, Row } from 'react-bootstrap';

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

function App() {
  const [account, setAccount] = useState();
  const [plots, setPlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState({});
  const [rates, setRates] = useState(1);
  const [showSellModal, setShowSellModal] = useState(false);

  const refreshPlots = async () => {
    const allPlots = [];
    for (let i = 0; i < 28; i++) {
      allPlots.push({
        ...(await contract.methods.plots(i).call()),
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

  return (
    <div>
      <Header account={account} />

      <Container>
        <Row>
          <Col>
            <h2 className="mb-4 mt-4 white">
              Buy a useless square today!
            </h2>

            <Squares
              setSelectedPlot={setSelectedPlot}
              rates={rates}
              plots={plots}
              account={account}
              setShowModal={setShowModal}
              setShowSellModal={setShowSellModal}
            />
          </Col>
        </Row>
      </Container>

      <PlotPriceModal
        account={account}
        contract={contract}
        onClose={setShowSellModal}
        onComplete={refreshPlots}
        plot={selectedPlot}
        rates={rates}
        show={showSellModal}
      />

      <BuyPlotModal
        rates={rates}
        account={account}
        contract={contract}
        onClose={setShowModal}
        onComplete={refreshPlots}
        plot={selectedPlot}
        show={showModal}
      />
    </div>
  );
}

export default App;
