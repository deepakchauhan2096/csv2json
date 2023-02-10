import React, { useState } from 'react'
import "./App.css"






const App = () => {

  //csv to json convertor
  const [file, setFile] = useState();
  const [array, setArray] = useState();









  ////csv to json convertor

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };


  console.log(array)

  // useEffect(() => {

  // }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };




  const exportData = () => {
    const newname = file?.name.split('.')
    const finalName = newname[0]
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(array)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${finalName}.json`;
    link.click();
  };


  console.log(file)




  return (
    <>

      <div class="card">
        <div className="container container-extra">
          <div className="container">
            <div className="row">
              <div className="col mt-5">
                <form style={{ display: "flex", flexDirection: "row" }} className="btn-dark">
                  <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                    className="btn btn-dark rounded-0 upload"
                  />
                  <button
                    onClick={(e) => {
                      handleOnSubmit(e);
                    }}
                    className="btn btn-dark rounded-0"
                  >
                    IMPORT CSV
                  </button>

                  
                  <p className='filename'>{file?.name}</p>
                </form>
                <p>
                  file name : {!file?.name ? "no file selected" : file?.name}
                  <br />
                  file length : {!array?.length ? "0" : array?.length}
                </p>
              </div>
              
            </div>
            <div className='col-6'>
              {array === undefined ? "" : <button type="button" onClick={exportData} className="btn btn-primary">
                    Download File
                  </button>}
                </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App