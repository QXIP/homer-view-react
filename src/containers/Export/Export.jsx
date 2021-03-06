import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const FileSaver = require("file-saver");

const exportData = {
  fontSize: "19px",
  color: "#666666",
  marginTop: "30px",
  marginBottom: "40px",
  textAlign: "center"
};

const widthBlockBtn = {
  width: "45%"
};

const btnsCenter = {
  width: "100%",
  margin: "0 auto"
};

const btnStyle = {
  background: "#3f51b5",
  textAlign: "left",
  color: "#fff",
  marginBottom: "18px",
  width: "178px"
};
const btnLightStyle = {
  background: "#3f51b5",
  textAlign: "left",
  color: "#fff",
  marginBottom: "18px",
  width: "178px",
  cursor: "not-allowed",
  pointerEvents: "none",
  opacity: "0.7"
};

const defaultProps = {
  exports: {},
  pcap: "",
  txt: ""
};

const propTypes = {
  exports: PropTypes.object,
  pcap: PropTypes.string,
  txt: PropTypes.string,
  getExportTxt: PropTypes.func
};

class Export extends React.Component {
  static defaultProps = defaultProps;

  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.downloadPcap = this.downloadPcap.bind(this);
    this.downloadTxt = this.downloadTxt.bind(this);
  }

  getFileName() {
    const tsHms = new Date();
    const date =
      tsHms.getMonth() + 1 + "/" + tsHms.getDate() + "/" + tsHms.getFullYear();
    const time =
      tsHms.getHours() + ":" + tsHms.getMinutes() + ":" + tsHms.getSeconds();
    return `HEPIC-${date} ${time}`;
  }

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.getExportPcap();
      this.props.getExportTxt();
    }
  }

  async downloadPcap() {
    let blob = new Blob([this.props.pcap], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, `${this.getFileName()}.pcap`);
  }

  async downloadTxt() {
    let blob = new Blob([this.props.txt], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, `${this.getFileName()}.txt`);
  }

  render() {
    return (
      <Grid>
        <Grid>
          <Typography style={exportData}>Export Session Data</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          style={btnsCenter}
        >
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
            style={widthBlockBtn}
          >
            <Button
              variant="contained"
              style={btnStyle}
              onClick={this.downloadPcap}
            >
              Export PCAP
            </Button>
            <Button
              variant="contained"
              style={btnStyle}
              onClick={this.downloadTxt}
            >
              Export TEXT
            </Button>
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={widthBlockBtn}
          >
            <Button variant="contained" style={btnLightStyle} disabled>
              Share Cloud
            </Button>
            <Button variant="contained" style={btnLightStyle} disabled>
              Share Link
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Export;
