import React from "react";
import { Card, Table } from "antd";
import { connect } from "dva";
@connect(({ reconciliation }) => ({ reconciliation }))
export default class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0
      },
      columns: [
        {
          title: "流水id",
          dataIndex: "folwId"
        },
        {
          title: "流水id",
          dataIndex: "folwId"
        },
        {
          title: "流水id",
          dataIndex: "folwId"
        },
        {
          title: "流水id",
          dataIndex: "folwId"
        },
        {
          title: "流水id",
          dataIndex: "folwId"
        }
      ]
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Card>
        <Table columns={this.state.columns} rowKey={record => record.id} />
      </Card>
    );
  }
}
