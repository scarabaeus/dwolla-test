import React, { useEffect } from 'react';

const options = {
  stylesheets: ['dwolla.css'],
  styles: {
    // most CSS properties can be supplied to these objects
    default: {
      // placeholder text
      // fontFamily: fontFamily,
      // fontSize: '1rem',
      // fontWeight: 'normal',
    },
    success: {
      // valid input text
      // color: '#1176BC',
      // fontFamily: fontFamily,
      // fontSize: '1rem',
      // fontWeight: 'bold',
    },
    error: {
      // invalid input text
      // color: '#d9534f',
      // fontFamily: fontFamily,
      // fontSize: '1rem',
      // fontWeight: 'bold',
    },
    buttonText: 'Pay Now!',
  },
};

function App() {
  useEffect(() => {
    console.log('Configuring sandbox...', window.dwolla);
    window.dwolla.configure('sandbox');

    console.log('Getting token...');
    fetch(
      `http://192.168.1.247:3000/dwolla/customers/7f9ce0fc-edc4-4be1-bd26-461344f4a6dd/card-funding-sources-token`,
      { method: 'POST' },
    )
      .then(async (res) => {
        return res.json();
      })
      .then(({ token }) => {
        window.dwolla.cards.start(
          'cardContainer',
          token,
          options,
        )((err, res) => {
          console.log(err);
          console.log(res);
          document.getElementById('cardContainer').style.display = 'none';
          document.getElementById('result').style.display = 'block';
        });
      });
  }, []);

  return (
    <div>
      <div id="cardContainer"></div>
      <pre id="preview"></pre>
      <pre id="bin"></pre>
    </div>
  );
}

export default App;
