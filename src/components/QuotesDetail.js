import React, { useState } from "react";
import "../css/quotes.css";

const loadQuotes = require("../asset/quotes.json");

const QuotesDetail = () => {
  const randomIndex = Math.floor(
    Math.random() * Object.keys(loadQuotes.k_name).length
  );
  const [Quotes, setQuotes] = useState({
    k_name: loadQuotes.k_name[randomIndex],
    k_quote: loadQuotes.k_quote[randomIndex],
    e_name: loadQuotes.e_name[randomIndex],
    e_quote: loadQuotes.e_quote[randomIndex],
  });
  const [isKr, setIsKr] = useState(true);
  const toggleQuoteChange = () => setIsKr((prev) => !prev);
  return (
    <div className="quotes_detail">
      <div>
        <span>{isKr ? Quotes.k_quote : Quotes.e_quote}</span>
        <div>- {isKr ? Quotes.k_name : Quotes.e_name} -</div>
      </div>
      <div>
        <label className="switch">
          <input type="checkbox" onClick={toggleQuoteChange} />
          <span className="slider round"></span>
          <span className="text"></span>
        </label>
      </div>
    </div>
  );
};

export default QuotesDetail;
