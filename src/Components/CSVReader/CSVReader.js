import React from 'react';
import './CSVReader.css';

class CSVReader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            csvFile: '',
            csvArray: []
        }
    }
    // const [csvFile, setCsvFile] = useState();
    // const [csvArray, setCsvArray] = useState([]);

    processCsv(str, delim=',') {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        this.setState({
            csvArray: newArray
        });
    }

    submit() {
        const file = this.state.csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            //console.log(text);
            this.processCsv(text);
        }.bind(this);

        this.props.updateRollHistory(this.state.csvArray);
        reader.readAsText(file);
    }

    render(){
        return(
            <div className="csvcontainer">
                <form id='csv-form'>
                    <div className="buttonCont">
                        <button className="download" onClick={this.props.save} id="save">Download</button>                
                        <button 
                            className="upload" 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                if(this.state.csvFile)this.submit()
                            }}
                        >
                            Upload
                        </button>
                    </div>
                    <div className="labelCont">
                        <label className='fileChoice'>
                            <input 
                                type="file" 
                                id="csvFile" 
                                accept=".csv" 
                                onChange={(e) => {
                                    this.setState({
                                        csvFile: e.target.files[0]
                                    })}
                                }
                            />Choose File
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default CSVReader;