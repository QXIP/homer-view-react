import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getQOSData,
  getGraphsData,
  isQOSLoaded,
  isQOSError,
  makeSelectQOSTab
} from "./selectors";
import QoS from "./QoS";
import { getQOSAsync, toggleSelection, toggleSidSelection } from "./actions";

const mapStateToProps = createStructuredSelector({
  qosTab: getQOSData,
  isLoaded: isQOSLoaded,
  isError: isQOSError,
  data: makeSelectQOSTab,
  graphs: getGraphsData
});

const mapDispatchToProps = {
  getQOSData: getQOSAsync.request,
  toggleSelection,
  toggleSidSelection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QoS);
