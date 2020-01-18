import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

const GeneratedEmailPage = () => {
  const [date, setDate] = useState("");
  const emailRef = useRef(null);
  let { name, civilId } = useParams();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          let node = emailRef.current;

          if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
          } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
            // copy to clip board
            document.execCommand("copy");

            // unselect text
            selection.removeAllRanges();
          } else {
            console.warn("Could not select text in node: Unsupported browser.");
          }
        }}
      >
        Copy
      </button>
      <div style={{ margin: "0 auto", padding: "10px" }}>
        <label htmlFor="date">Insert date: </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={e => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div
        ref={emailRef}
        style={{ margin: "0 auto", backgroundColor: "white", padding: "20px" }}
      >
        <p>Greetings Gentlemen,</p>
        <p>Please arrange gate passes for the individuals below:</p>

        <table style={{ width: "100%", border: "1px solid black" }}>
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <th
                style={{
                  border: "1px solid black",
                  color: "white",
                  backgroundColor: "grey",
                  // width: "50%",
                  padding: "10px"
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid black",
                  color: "white",
                  backgroundColor: "grey",
                  // width: "50%",
                  padding: "10px"
                }}
              >
                Civil Id
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {name}
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {civilId}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                Eve
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                Jackson
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        <p>
          This is for{" "}
          <mark>
            <strong>Sunday {date}</strong>
          </mark>
        </p>
      </div>
    </>
  );
};

export default GeneratedEmailPage;
