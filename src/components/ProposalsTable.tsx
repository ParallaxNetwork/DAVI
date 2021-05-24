import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useStores } from '../contexts/storesContext';
import ActiveButton from '../components/common/ActiveButton';
import { Link } from 'react-router-dom';
import moment from 'moment';
import boltIcon from "assets/images/bolt.svg"

const ProposalsTableWrapper = styled.div`
    width: 100%;
    background: white;
    padding: 10px 0px;
    border: 1px solid var(--medium-gray);
    margin-top: 24px;
    font-weight: 400;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    .loader {
      text-align: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      color: #BDBDBD;
      padding: 44px 0px;
      
      img {
        margin-bottom: 10px;
      }
    }
`;

const ProposalsFilter = styled.select`
  background-color: ${(props) => props.color || '#536DFE'};
  border-radius: 4px;
  color: white;
  height: 34px;
  letter-spacing: 1px;
  font-weight: 500;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
  width: max-content;
  padding: 0px 10px;
  margin: 5px;
  font-family: var(--roboto);
  border: 0px;
`;

const ProposalsNameFilter = styled.input`
  background-color: white;
  border: 1px solid #536DFE;
  border-radius: 4px;
  color: #536DFE;
  height: 34px;
  letter-spacing: 1px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  cursor: pointer;
  width: max-content;
  padding: 0px 10px;
  margin: 5px;
  font-family: var(--roboto);
`;

const ProposalTableHeaderActions = styled.div`
    padding: 0px 10px 10px 10px;
    color: var(--dark-text-gray);
    border-bottom: 1px solid var(--line-gray);
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    
    span {
      font-size: 20px;
      padding: 10px 5px 5px 5px;
    }
`;

const ProposalTableHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: var(--light-text-gray);
    padding: 20px 40px 8px 24px;
    font-size: 14px;
    text-align: center;
`;

const TableHeader = styled.div`
    width: ${(props) => props.width || '25%'};
    text-align: ${(props) => props.align};
`;

const TableRowsWrapper = styled.div`
    overflow-y: scroll;
    height: 350px;
`;

const TableRow = styled.div`
    font-size: 16px;
    line-height: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--line-gray);
    padding: 16px 24px;
    color: var(--dark-text-gray);
    text-align: right;
    cursor: pointer;
`;

const TableCell = styled.div`
    a {
        text-decoration: none;
        width: 100%;

        &:hover{
            color: var(--turquois-text-onHover);
        }
    }
    color: ${(props) => props.color};
    width: ${(props) => props.width || '25%'}
    text-align: ${(props) => props.align};
    font-weight: ${(props) => props.weight};
    white-space: ${(props) => props.wrapText ? 'nowrap' : 'inherit'};
    overflow: ${(props) => props.wrapText ? 'hidden' : 'inherit'};
    text-overflow: ${(props) => props.wrapText ? 'ellipsis' : 'inherit'};
`;

const ProposalsTable = observer(() => {
    const {
        root: { providerStore, daoStore, blockchainStore },
    } = useStores();

    const { library, active } = providerStore.getActiveWeb3React();
    const [stateFilter, setStateFilter] = React.useState("All");
    const [titleFilter, setTitleFilter] = React.useState("");
    
    
    if (!active) {

      return (
        <ProposalsTableWrapper>
          <div className="loader">
          <img alt="bolt" src={boltIcon} />
              <br/>
              Connect to view proposals
          </div>
        </ProposalsTableWrapper>
      )
    } else {
      
      const allProposals = daoStore.getAllProposals().sort(function(a, b) { return b.priority - a.priority; });
      function onStateFilterChange(newValue) { setStateFilter(newValue.target.value) }
      function onTitleFilterChange(newValue) { setTitleFilter(newValue.target.value) }
      console.log("All Proposals", allProposals, allProposals.length, daoStore);
      
      return (
        <ProposalsTableWrapper>
          <ProposalTableHeaderActions>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <ProposalsNameFilter
                type="text"
                placeholder="Search by proposal title"
                name="titleFilter"
                id="titleFilter"
                onChange={onTitleFilterChange}
              ></ProposalsNameFilter>
              <ProposalsFilter name="stateFilter" id="stateSelector" onChange={onStateFilterChange}>
                <option value="All">All</option>
                <option value="Pending Boost">Pending Boost</option>
                <option value="Pre Boosted">Pre Boosted</option>
                <option value="Boosted">Boosted</option>
                <option value="In Queue">Queue</option>
                <option value="Quiet Ending Period">Quiet Ending Period</option>
                <option value="Passed">Passed</option>
                <option value="Pending Execution">Pending Execution</option>
                <option value="Rejected">Rejected</option>
                <option value="Executed">Executed</option>
                <option value="Expired in Queue">Expired</option>
              </ProposalsFilter>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <ActiveButton route="/?view=schemes">Schemes</ActiveButton>
              <ActiveButton route="/?view=dao">DAO</ActiveButton>
              <ActiveButton route="/new">+ New Proposal</ActiveButton>
            </div>
          </ProposalTableHeaderActions>
          <ProposalTableHeaderWrapper>
              <TableHeader width="40%" align="left"> Title </TableHeader>
              <TableHeader width="10%" align="center"> Scheme </TableHeader>
              <TableHeader width="15%" align="center"> Status </TableHeader>
              <TableHeader width="17.5%" align="center"> Staked </TableHeader>
              <TableHeader width="17.5%" align="center"> Votes  </TableHeader>
          </ProposalTableHeaderWrapper>
          { (!blockchainStore.initialLoadComplete || (allProposals.length === 0)) ?
            <TableRowsWrapper>
              <div className="loader">
              <img alt="bolt" src={boltIcon} />
                <br/>Searching for proposals..
              </div>
            </TableRowsWrapper>
            :
            <TableRowsWrapper>
              { allProposals.map((proposal, i) => {
                if (
                  proposal 
                  && ((stateFilter == 'All') || (stateFilter != 'All' && proposal.status == stateFilter))
                  && (titleFilter.length == 0) || ((titleFilter.length > 0) && (proposal.title.indexOf(titleFilter) >= 0))
                ) {
                  const positiveStake = Number(library.utils.fromWei(proposal.positiveStakes.toString())).toFixed(2);
                  const negativeStake = Number(library.utils.fromWei(proposal.negativeStakes.toString())).toFixed(2);
                  const positiveVotesPercentage = proposal.positiveVotes.div( proposal.repAtCreation ).times("100").toNumber().toFixed(2);
                  const negativeVotesPercentage =  proposal.negativeVotes.div( proposal.repAtCreation ).times("100").toNumber().toFixed(2);
                  const timeToBoost = proposal.boostTime.toNumber() > moment().unix() ? 
                    moment().to( moment(proposal.boostTime.times(1000).toNumber()) ).toString()
                    : "";
                  const timeToFinish = proposal.finishTime.toNumber() > moment().unix() ?
                    moment().to( moment(proposal.finishTime.times(1000).toNumber()) ).toString()
                    : "";
                  return (
                    <Link key={"proposal"+i} to={"/scheme/"+proposal.scheme+"/proposal/"+proposal.id} style={{textDecoration: "none"}}>
                      <TableRow>
                        <TableCell width="40%" align="left" weight='500' wrapText="true">
                          {proposal.title}
                        </TableCell>
                        <TableCell width="10%" align="center">
                          {daoStore.getCache().schemes[proposal.scheme].name}
                        </TableCell>
                        <TableCell width="15%" align="center">
                          {proposal.status} <br/>
                          {(proposal.boostTime.toNumber() > moment().unix()) ? <small>Boost {timeToBoost} <br/></small> : <span></span>}
                          {(proposal.finishTime.toNumber() > moment().unix()) ? <small>Finish {timeToFinish} </small> : <span></span>}
                        </TableCell>
                        <TableCell width="17.5%" align="center"> 
                          <span style={{color: "green"}}>{positiveStake} DXD </span>
                          -
                          <span style={{color: "red"}}> {negativeStake} DXD</span>
                        </TableCell>
                        <TableCell width="17.5%" align="center"> 
                          <span style={{color: "green"}}>{positiveVotesPercentage} % </span>
                          -
                          <span style={{color: "red"}}> {negativeVotesPercentage} %</span>
                        </TableCell>
                      </TableRow>
                    </Link>);
                  } else {
                    return null;
                  }
                }
              )}
            </TableRowsWrapper>
          }
        </ProposalsTableWrapper>
      );
    }
});

export default ProposalsTable;
