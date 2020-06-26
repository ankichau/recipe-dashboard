import React from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { Table } from "antd";

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "LAST UPDATED",
    dataIndex: "lastUpdated",
    sorter: {
      compare: (a, b) =>
        new Date(a.last_updated.date) - new Date(b.last_updated.date),
    },
  },
  {
    title: "COGS %",
    dataIndex: "cogs",
    sorter: {
      compare: (a, b) => a.cogs - b.cogs,
    },
  },
  {
    title: "COST PRICE(')",
    dataIndex: "cost_price",
    sorter: {
      compare: (a, b) => a.cost_price - b.cost_price,
    },
  },

  {
    title: "SALE PRICE",
    dataIndex: "sale_price",
    sorter: {
      compare: (a, b) => a.sale_price - b.sale_price,
    },
  },
  {
    title: "GROSS MARGIN",
    dataIndex: "gross_margin",
    sorter: {
      compare: (a, b) => a.gross_margin - b.gross_margin,
    },
  },
  {
    title: "ACTIONS/TAGS",
    dataIndex: "actions_tags",
  },
];

class RecipeTable extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { data } = this.props;
    data.forEach((recipe, index) => {
      data[index].lastUpdated = moment(recipe.last_updated.date).format(
        "MMMM DD, YYYY"
      );
      data[index].key = `tab-row-${recipe.id}`;
      data[index].actions_tags = (
        <>
          <span className="tags-action-string">Indian </span>
          <span
            style={{ background: "#f9f5ac" }}
            className="tags-action-string"
          >
            Indian
          </span>
        </>
      );
    });

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    );
  }
}
export default RecipeTable;
