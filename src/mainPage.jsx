
import React, { Component } from "react";
import ReactDOM from "react-dom";

// Widgets used by this page
import { DateTimePicker, DropdownList } from 'react-widgets';
import ReactTable from "react-table";

// CSS for widgets
import "react-table/react-table.css";
import 'react-widgets/dist/css/react-widgets.css';


// Localization support...
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import simpleNumberLocalizer from 'react-widgets-simple-number';

const devMode = false;

class MainPage extends React.Component {

      constructor(props) {
          super(props);

          // Setup the React "state" object used by this page...
          let now = new Date();
          this.state = {
            isLoaded: false,
            devices: null,
            currentDevice: null,
            data: null,
            error: null,
            startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
            endDate: now
        };

        // Localization required by React Widgets
        Moment.locale('en');
        momentLocalizer();
        simpleNumberLocalizer();

        this.formatNumber = function(number) {
            return number.toFixed(2);
        }

        this.formatDate = function(date) {
            return Moment(date).format('L LT');
        }


        if (devMode) {
            this.state.isLoaded = true;
            this.state.devices = ['device1', 'device2', 'device3'];          
        }

      }
    
      updateData() {
      }


      componentDidMount() {
        if (!devMode) {
          fetch("/plugins/signalk-hour-meter/api/devices")
            .then((res) => {
              return res.json()
            })
            .then(
              (data) => {
                this.setState({
                  isLoaded: true,
                  error: null,
                  devices: data,
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error,
                  devices: null
                });
              }
            )
        }      
      }
    

      componentWillUnmount() {
      }
  


      getHours(secs) {
        return this.formatNumber(secs / 3600);
      }



      fetchHistory() {
        if (!devMode) {
          let sStart = this.state.startDate.toISOString();
          let sEnd = this.state.endDate.toISOString()
          fetch(`/plugins/signalk-hour-meter/api/history/${this.state.currentDevice}?start=${sStart}&end=${sEnd}`)
            .then((res) => {
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
          );

          this.setState({
              data: null
          });
        }
        else {
          // Mock data...
          this.setState({
            data: {
              totalRunTime: 217,
              historyRunTime: 217,
              history: [
                {
                start: "2019-10-29T21:09:35.122Z",
                end: "2019-10-29T21:12:12.529Z",
                runTime: 157
                },
                {
                start: "2019-10-29T21:15:59.224Z",
                end: "2019-10-29T21:16:59.211Z",
                runTime: 60
                }
              ]
            }
           });          
        }
      }


      render() {
        const { isLoaded, devices, currentDevice, data, error } = this.state;

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
              <div className="device section">
                <div className="formLabel">Device</div>
                <DropdownList 
                     data={devices}
                     value={currentDevice} 
                     onChange={ value => this.setState({currentDevice: value, data: null}) }
                     className="inlineRight devicePicker" />
              </div>

          { currentDevice &&
              <div className="history">

                  <div className="dateRange section">
                    <div className="formLabel">Show history from</div>
                    <DateTimePicker 
                        className="inlineRight datePicker"
                        value={this.state.startDate}
                        onChange= { value => this.setState({ startDate: value })} />
                    <div className="inlineRight formLabel">thru</div>
                    <DateTimePicker 
                        className="inlineRight datePicker"
                        value={this.state.endDate}
                        onChange= { value => this.setState({endDate: value})} />

                    <button className="inlineRight getButton" onClick={this.fetchHistory.bind(this)}>Get history</button>
                  </div>

             { data &&
                  <div className = "section results">
                     <div className = "section lifeStats">
                        <div className="formLabel">Life time hours:</div>
                        <div className="inlineRight">{this.getHours(data.totalRunTime)}</div>
                     </div>
                     <div className = "section grid">
                        <ReactTable
                          data={data.history}
                          columns={[
                                {
                                  Header: "Start",
                                  id: "start",
                                  accessor: h => this.formatDate(new Date(h.start)),
                                  sortMethod: (a, b) => {
                                    if (a.start === b.start) {
                                      return 0;
                                    }
                                    return (a.start > b.start) ? -1 : 1;
                                  }
                                },
                                {
                                  Header: "End",
                                  id: "end",
                                  accessor: h => this.formatDate(new Date(h.end)),
                                  sortMethod: (a, b) => {
                                    if (a.end === b.end) {
                                      return 0;
                                    }
                                    return (a.end > b.end) ? -1 : 1;
                                  }
                                },
                                {
                                  Header: "Run time",
                                  id: "runTime",
                                  accessor: h => this.getHours(h.runTime),
                                  className: 'colRunTime',
                                  Footer: (
                                    <div className="colTotal">
                                        <strong>Total</strong>
                                        <div className="inlineRight">{this.getHours(data.historyRunTime)}</div>
                                    </div>
                                  )
                                }
                              ]}

                          defaultSorted={[
                            {
                              id: "end",
                              desc: true
                            }
                          ]}

                          defaultPageSize={ (history.length > 20 ? 20 : history.length )}

                          className="-striped -highlight"
                        />
                     </div>
                  </div>
             }
              </div>
          }
            </div>
          );
        }
      }
}


let domContainer = document.querySelector('#mainBody');
ReactDOM.render(<MainPage />, domContainer);
