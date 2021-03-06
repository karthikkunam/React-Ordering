import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SINGLE_DAY } from '../../constants/ActionTypes';
// import MessageBox from '../shared/MessageBox';
import './ReportingDetailMutiDayGrid.css'
import SpinnerComponent from '../shared/SpinnerComponent';
import { getItemStatus, getPromotionDetails, getBillback } from '../utility/promoInfo';

class ReportingDetailDailyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportingItemDetails: [],
            // showModal: false,
            // msgBoxBody: '',
            dailySpinner: false
        }
    }

    componentDidMount() {
        const { reportingItemDetails } = this.props;
        this.setState({
            reportingItemDetails: reportingItemDetails,
            dailySpinner: this.props.reportingItemDetails && this.props.reportingItemDetails.length > 0 ? false : true
        });
    }

    componentWillReceiveProps(newProps) {
        //const { showModal } = this.state;  
        this.setState({
            reportingItemDetails: newProps.reportingItemDetails,
        }, () => {
            // if(this.state.reportingItemDetails.length == 0){
            //     this.setState({showModal: !showModal, 
            //         msgBoxBody: `No data is available for the selected date.`});
            // }
            if (this.state.reportingItemDetails && this.state.reportingItemDetails.length > 0) {
                this.setState({
                    dailySpinner: this.state.reportingItemDetails && this.state.reportingItemDetails.length > 0 ? false : true
                })
            }
        });
    }

    render() {
        const { reportingItemDetails, dailySpinner } = this.state;
        return (
            <div>
                <div>
                    <div className="reportingDetailGrid">
                        <div className="row  grid-header-row">
                            <table className="table" >
                                <thead>
                                    <tr className="row " >
                                        <th className="col-md-3 grid-header align-middle">
                                            <span className="bold">Category, </span>
                                            <span>Item Description</span>
                                        </th>
                                        <th className="col-md-1 grid-header align-middle"></th>
                                        <th className="col-md-2 grid-header align-middle">Item Number</th>
                                        <th className="col-md-5">
                                            <div className="row item-sales-trend-first-row-div">
                                                <div className="col">Item Sales Trend</div>
                                            </div>
                                            <div className="row item-sales-trend-second-row-div">
                                                <div className="col">FP 4</div>
                                                <div className="col">FP 3</div>
                                                <div className="col">FP 2</div>
                                                <div className="col">FP 1</div>
                                            </div>
                                        </th>
                                        <th className="col-md-1 grid-header align-middle" >Order</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="row table-wrapper-scroll-y cat-table-parent-div" >
                                {
                                    reportingItemDetails && reportingItemDetails.length > 0 ?
                                        reportingItemDetails.map((data, index) => {
                                            return (
                                                <table key={index} className="container reporting-cat-item-detail">
                                                    <thead>
                                                        <tr className="row " key={data.itemId} >
                                                            <th className="col-md-3 coloring-stripe-singleday cat-item-table-text"
                                                                data-label="Group,Category">
                                                                {data.categoryName}
                                                            </th>
                                                            <th className="col-md-2 cat-item-table-text-light">
                                                                <span>Device: {data.device}</span>
                                                            </th>
                                                            <th className="col-md-4 cat-item-table-text-light">
                                                                Order Writer: {data.orderWriter}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data.items && data.items.length > 0 &&
                                                            data.items.map((item, childIndex) => {
                                                                return (
                                                                    <tr key={childIndex} className="row tr-cat deatailsTd-first">
                                                                        <td className="col-md-3 deatailsTd-other leftAlign">{item.itemName}</td>
                                                                        <td className="col-md-1">
                                                                            {getPromotionDetails(item.promotion)}
                                                                            <span className="daily-span-spacing">{getBillback(item.isBillBackAvailable)}</span>
                                                                            <span className="daily-span-spacing">{getItemStatus(item.itemStatus)}</span>
                                                                        </td>
                                                                        <td className="col-md-2 ">{item.itemId}</td>
                                                                        <td className="col-md-5" >
                                                                            <div className="row forecast-period-div">
                                                                                <div className="col cat-forecast-period "> {item.forecastPeriod4 ? item.forecastPeriod4 : item.forecastHistory ? item.forecastHistory.fp4 : null}</div>
                                                                                <div className="col cat-forecast-period "> {item.forecastPeriod3 ? item.forecastPeriod3 : item.forecastHistory ? item.forecastHistory.fp3 : null}</div>
                                                                                <div className="col cat-forecast-period "> {item.forecastPeriod2 ? item.forecastPeriod2 : item.forecastHistory ? item.forecastHistory.fp2 : null}</div>
                                                                                <div className="col cat-forecast-period "> {item.forecastPeriod1 ? item.forecastPeriod1 : item.forecastHistory ? item.forecastHistory.fp1 : null}</div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="orderQuantity"><span>{item.itemOrderQty}</span></td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            );
                                        }) : ((!dailySpinner) && <span className="reporting-no-data-indicator  no-data-indicator">No Data Available</span>)
                                }
                            </div>
                        </div>
                        { dailySpinner &&
                            <div className = "multi-spinner-component">
                                <div className = "multi-spinner">
                                <SpinnerComponent displaySpinner = {dailySpinner}/> 
                                </div> 
                            </div>
                        }
                    </div>
                </div>
                {/* <div>
                    {showModal &&
                        <MessageBox
                            msgTitle=""
                            msgBody={msgBoxBody}
                            className={"message-box-reporting"}
                            initialModalState={false}
                            reporting={true} />}
                </div> */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return ({
        reportingItemDetails: state.reporting.reportingItemDetails && state.reporting.reportingItemDetails[SINGLE_DAY] ? state.reporting.reportingItemDetails[SINGLE_DAY] : []
    });
}


export default connect(
    mapStateToProps
)(withRouter(ReportingDetailDailyGrid))