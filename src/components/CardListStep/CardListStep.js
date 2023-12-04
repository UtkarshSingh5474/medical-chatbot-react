import React from "react";
import "./CardListStep.css";

class CardListStep extends React.Component {
  componentDidMount() {
    // Automatically trigger the next step after 5 seconds
    setTimeout(() => {
      this.props.triggerNextStep({
        value: "Card list displayed successfully!",
        trigger: "userInput",
      });
    }, 5000); // 5000 milliseconds (5 seconds)
  }
  handleViewProductClick = (link) => {
    window.open(link, "_blank");
  };

  render() {
    const { previousStep } = this.props;
    const apiData = previousStep.value;

    return (
      <div className="containerStyle">
        {Object.keys(apiData).map((category, index) => (
          <div key={index}>
            <h2 className="categoryStyle">#{category}</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {apiData[category].topResults.slice(0, 5).map((item, i) => (
                <div className="cardStyle" key={i}>
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="imageStyle"
                    />
                  )}
                  <h3 className="headingStyle">{item.name}</h3>
                  <p className="priceStyle">₹{item.current_price}</p>
                  <a
                    className="linkStyle"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Product
                  </a>
                </div>
              ))}
              <a
                href={apiData[category].searchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="viewSimilarStyle"
              >
                View Similar
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default CardListStep;
