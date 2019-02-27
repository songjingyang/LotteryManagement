// import React from 'react'
// import {
//   Form,
//   Select,
//   InputNumber,
//   Switch,
//   Radio,
//   Slider,
//   Button,
//   Upload,
//   Icon,
//   Rate,
//   Tooltip,
//   Input,
//   Table,
//   Card,
//   Spin,
//   DatePicker,
//   Row,
//   Col,
//   Modal,
//   message
// } from 'antd'
// import { connect } from 'dva'
// import debounce from 'lodash/debounce';
// const RadioGroup = Radio.Group
// const Option = Select.Option
// const FormItem = Form.Item
// const RangePicker = DatePicker.RangePicker
// @connect(({ global }) => ({
//   global
// }))
// export default class SelectInput extends React.Component {
//   constructor (props) {
//     super(props)
//     this.lastFetchId = 0;
//     this.fetchUser = debounce(this.fetchUser, 800);
//     this.state = {
//        value: [],
//        pagination: {
//         current: 1,
//         pageSize: 20,
//         total: 0
//       },
//       loading: false,
//     }
//   }
//   componentWillReceiveProps (nextProps) {
//     if ('checked' in nextProps) {
//       this.setState({
//         checked: nextProps.checked
//       })
//     }
//   }

//   // componentDidMount () {
//   //   this.props.dispatch({
//   //     type: 'global/getLetterNav',
//   //     paylaod: {}
//   //   })
//   // }
//  fetchUser = (value) => {
//     console.log('fetching user', value)
//     this.lastFetchId += 1
//     const fetchId = this.lastFetchId
//     this.setState({ data: [], fetching: true })
//     // fetch('/index/UserManager/userItem',
//     // { method: 'POST',
//     // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
//     //  body: JSON.stringify({name :value })})
//     //  .then(response => response.json())
//     //   .then((body) => {
//     //     if (fetchId !== this.lastFetchId) { // for fetch callback order
//     //       return;
//     //     }
//     //     const data = body.payload.list.map(user => ({
//     //       text: `${user.name}`,
//     //       value: user.id,
//     //     }));
//     //     this.setState({ data, fetching: false });
//     //   });
//        this.props.dispatch({
//       type: 'global/getContentId',
//       payload : {
//         name : value
//       },
//       // if (fetchId !== this.lastFetchId) {
//       //     return
//       //   }
//         const data = body.payload.list.map(user => ({
//           text: `${user.name}`,
//           value: user.id,
//         }))
//         // this.setState({ data, fetching: false })
//   })
//   debugger
//  }
//   handleChange = (value) => {
//     this.setState({
//       value,
//       data: [],
//       fetching: false,
//     });
//   }
//   render () {
//     const { fetching, data, value } = this.state;
//     return (
//             <Card>
//                <Select
//                     mode="multiple"
//                     labelInValue
//                     // value={value}
//                     placeholder="Select users"
//                     notFoundContent={fetching ? <Spin size="small" /> : null}
//                     filterOption={false}
//                     onSearch={this.fetchUser}
//                     onChange={this.handleChange}
//                     style={{ width: '100%' }}
//                   >
//                     {/* {data.map(d => <Option key={d.value} value={d.value}>{d.text}</Option>)} */}
//                   </Select>
//             </Card>
//           )
//   }
// }
