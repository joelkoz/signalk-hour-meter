'use strict';

class MainPage extends React.Component {

      constructor(props) {
          super(props);

          // Setup the React "state" object used by this page...
          this.state = {
            isLoaded: false,
            data: null,
            error: null,
        };

      }
    
      updateData() {
        // Make an API call to retrieve the data...
        fetch("/plugins/signalk-hour-meter/api/testData")
          .then((res) => {
             let myres = res;
             return res.json()
          })
          .then(
            (data) => {
              this.setState({
                isLoaded: true,
                error: null,
                data,
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
                data: null
              });
            }
          )
      }


      componentDidMount() {
        this.updateData();
        // Automatically update the page every 10 seconds...
        this.interval = setInterval(() => this.updateData(), 10000);        
      }
    

      componentWillUnmount() {
        clearInterval(this.interval);
      }


      render() {
        const { isLoaded, data, error } = this.state;

        if (!isLoaded) {
          return <div>Waiting for response from server...</div>;
        }
        else if (error) {
          return <div>Error: {error.message}</div>;
        } 
        else {
          return (
            <div>
              <h1>Hour meter</h1>
              <div className="info">Engine 0 revolutions: {data.engine0Revs}</div>
            </div>
          );
        }
      }
}

let domContainer = document.querySelector('#mainBody');
ReactDOM.render(<MainPage />, domContainer);
