// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

uint256 constant TOTAL_PLOTS = 28;

contract UselessSquares {
    address public owner = msg.sender;

    struct Plot {
        address owner;
        string text;
        uint256 color;
        uint256 price;
    }

    Plot[TOTAL_PLOTS] public plots;

    constructor() {
        for (uint256 i = 0; i < TOTAL_PLOTS; i++) {
            plots[i] = Plot({
                owner: owner,
                text: "/u0CA0_/u0CA0",
                color: 0xFF0000,
                price: 1e15
            });
        }
    }

    function buyPlot(
        uint256 _plot,
        string memory _text,
        uint256 _color
    ) external payable {
        require(_plot >= 0 && _plot < TOTAL_PLOTS); // can't go out of bounds
        require(plots[_plot].price > 0); // must be for sale
        require(msg.value >= plots[_plot].price); // they must pay the right price
        (bool success, ) = plots[_plot].owner.call{
            value: plots[_plot].price
        }("");
        require(success);
        plots[_plot].owner = msg.sender;
        plots[_plot].price = 0;
        plots[_plot].text = _text;
        plots[_plot].color = _color;
    }

    function setPlotPrice(uint256 _plot, uint256 _price) external {
        require(_plot >= 0 && _plot < TOTAL_PLOTS); // can't go out of bounds
        require(plots[_plot].owner == msg.sender); // must be owner
        plots[_plot].price = _price;
    }
}
