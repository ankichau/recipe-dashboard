import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import RecipeTable from "./Components/RecipeTable.js";
import Loader from "react-loader-spinner";

const { TabPane } = Tabs;

const url = "https://beta.eagleowl.in";
const baseApiUrl =
  "/api/v1/mock/organization/18/outlet/18/recipe/recipes/?page=1";
const TABS = ["ALL RECIPES", "INCORRECT", "UNTAGGED", "DISABLED"];
export default class RecipeList extends Component {
  state = {
    allrecipes: {
      data: [],
      next: `${baseApiUrl}`,
    },
    isuntagged: {
      data: [],
      next: `${baseApiUrl}&is_untagged=true`,
    },
    isincorrect: {
      data: [],
      next: `${baseApiUrl}&is_incorrect=true`,
    },
    isdisabled: {
      data: [],
      next: `${baseApiUrl}&is_disabled=true`,
    },
    selectedTab: "1",
  };

  componentDidMount() {
    this.AllRecipies();
  }

  AllRecipies = (index) => {
    const { allrecipes, selectedTab } = this.state;
    if ((index && index.toString()) === selectedTab) {
      fetch(`${url}${allrecipes.next}`)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            allrecipes: {
              data: this.state.allrecipes.data.concat(data.results),
              next: data.next,
            },
          })
        );
    }
  };

  FilterUntagged = (index) => {
    const { isuntagged, selectedTab } = this.state;
    if ((index && index.toString()) === selectedTab) {
      fetch(`${url}${isuntagged.next}`)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            isuntagged: {
              data: this.state.isuntagged.data.concat(data.results),
              next: data.next,
            },
          })
        );
    }
  };
  FilterDisabled = (index) => {
    const { isdisabled, selectedTab } = this.state;
    if ((index && index.toString()) === selectedTab) {
      fetch(`${url}${isdisabled.next}`)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            isdisabled: {
              data: this.state.isdisabled.data.concat(data.results),
              next: data.next,
            },
          })
        );
    }
  };
  FilterIncorrect = (index) => {
    const { isincorrect, selectedTab } = this.state;
    if ((index && index.toString()) === selectedTab) {
      fetch(`${url}${isincorrect.next}`)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            isincorrect: {
              data: this.state.isincorrect.data.concat(data.results),
              next: data.next,
            },
          })
        );
    }
  };

  getTabData = (tab, index) => {
    const { allrecipes, isuntagged, isdisabled, isincorrect } = this.state;
    const {
      AllRecipies,
      FilterDisabled,
      FilterIncorrect,
      FilterUntagged,
    } = this;
    let data, next, loadMore;
    switch (tab) {
      case "ALL RECIPES":
        data = allrecipes.data;
        next = allrecipes.next;
        loadMore = () => AllRecipies(index);
        break;
      case "UNTAGGED":
        data = isuntagged.data;
        next = isuntagged.next;
        loadMore = () => FilterUntagged(index);
        break;
      case "DISABLED":
        data = isdisabled.data;
        next = isdisabled.next;
        loadMore = () => FilterDisabled(index);
        break;
      case "INCORRECT":
        data = isincorrect.data;
        next = isincorrect.next;
        loadMore = () => FilterIncorrect(index);
        break;
      default:
        return;
    }

    return (
      <>
        <InfiniteScroll
          pageStart={data.length}
          loadMore={loadMore}
          hasMore={!!next}
          key={`scroll-${tab.replace(" ", "")}`}
          loader={
            <Loader
              type="Oval"
              key={`loader-${tab.replace(" ", "")}`}
              color="#4893D2"
              height={60}
              width={50}
              timeout={0}
              secondaryColor={"white"}
              style={{ paddingLeft: "45%" }}
            />
          }
        >
          {" "}
          <RecipeTable
            tab={tab}
            key={`table-${tab.replace(" ", "")}`}
            data={data}
          />
        </InfiniteScroll>
        {!next && data.length > 0 && (
          <h2 style={{ textAlign: "center" }}>Yay! You have seen it all</h2>
        )}
      </>
    );
  };

  updateSelectedTab = (selectedTab) => {
    this.setState({
      selectedTab,
    });
  };

  render() {
    return (
      <div
        style={{
          width: "100wh%",
          margin: 15,
          marginTop: "25px",
          height: "100vh",
          background: "white",
        }}
      >
        <Tabs
          type="card"
          defaultActiveKey={"1"}
          onChange={this.updateSelectedTab}
        >
          {TABS.map((tab, tabIndex) => (
            <TabPane tab={tab} key={tabIndex + 1}>
              {this.getTabData(tab, tabIndex + 1)}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
