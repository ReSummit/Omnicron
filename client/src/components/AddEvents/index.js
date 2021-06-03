import React, {useState, updateTime} from 'react';
//import 'antd/dist/antd.css';
import { Modal, Form, Input, Button, Space, Checkbox, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import './AddEvents.css';
import Title from 'antd/lib/skeleton/Title';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const timeFormat = 'MMMM Do h:mm a';
const rounded = Math.round(moment().minute() / 15) * 15;
const roundedDown = Math.floor(moment().minute() / 15) * 15;
const roundedUp = Math.ceil(moment().minute() / 15) * 15;

const { RangePicker } = DatePicker;

class AddEvents extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false,
            //beginTime: "00:00",
            //endTime: "00:00"
            beginTime: 0,
            endTime: 0,
        };
        this.eventName = "";
        this.repeating = false;
        this.people = [];
        this.time = "";
        this.decided = false;
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    
    handleOpenModal() {
        this.setState({showModal:true});
    }

    handleCloseModal() {
        this.setState({showModal:false});
    }

    callAPI() {
        // Needs variable to handle profile and groups
        // Either entered manually or through the profiles page
        fetch("http://localhost:5000/events/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({
                name: this.eventName,
                repeating: this.repeating,
                people: [
                    {
                        profile: "60b176f28ae12e6144722883",
                        confirmed: false,
                        host: true
                    }]
                ,
                time: {
                    start: this.state.beginTime,
                    end: this.state.endTime
                }, 
                decided: this.decided
            }),
        }).then(res => res.json())
        .then(res => console.log(res));
    }

    onFinish = (values) => {
        console.log('Success:', values);
        console.log(values);
        this.eventName = values.title;
        this.repeating = values.repeat;
        console.log(this.eventName)
        console.log(this.state.beginTime)
        console.log(this.state.endTime)
        this.callAPI();
        this.handleCloseModal();
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    // Code to select and update time without pressing ok. UNFINISHED
    /*
    timePickerBlur(time) {
        //Ofc you can use state or whatever here :)
        this.formRef.current.setFieldsValue({
            time_of_day: time,
        });
    }*/

    render(){
        return(
            <div>
            <button onClick={this.handleOpenModal}>Add New Event</button>
            <Modal
                visible={this.state.showModal} 
                okText="Submit"
                okButtonProps={{form: "form", htmlType: "submit"}}
                cancelButtonProps={{style:{ background: "white", color: "#1890FF"}}}
                onCancel={this.handleCloseModal}
                width={700}
            >
                <Form
                    {...layout}
                    id = "form"
                    name="basic"
                    initialValues={{
                        repeat: false,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        //label="eventTitle"
                        name="title"
                        rules={[
                        {
                            //Leave as required for now but other event pages allow you to use (untitled event)
                            required: true,
                            message: 'Please input an event title!',
                        },
                        ]}
                    >
                        <Input placeholder= "Add event title" />
                    </Form.Item>

                    <Form.Item name="date">
                        {/* FOR NOW CHANGE END TIME FIRST */}
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            use12Hours
                            className="timepicker"
                            defaultValue={[moment().minute(roundedUp).second(0), moment().minute(roundedUp).add(30, "minutes").second(0)]}
                            onOk={(value) => {;;
                                //This changes the times to string format 
                                //this.setState({beginTime: moment(value[0]).format("HH:mm")});
                                //this.setState({endTime: moment(value[1]).format("HH:mm")});
                                this.setState({beginTime: value[0].valueOf()});
                                this.setState({endTime: value[1].valueOf()});
                            }}
                            format={timeFormat} minuteStep={15}
                        />
                        {/* <RangePicker className="timepicker" defaultValue={[moment().minute(roundedUp).second(0), moment().minute(roundedUp).add(30, "minutes").second(0)]} format="MM-DD HH:mm"
                            // Code to select and update time without pressing ok. UNFINISHED
                            // Default values only work if you open up and press okay
                            // Changing start time to a bigger value than end time causes end time to be replaced with the new value instead of start time changing
                            // and end time updating to (30 minutes + start time)                    
                            
                            onOk={(value) => {;;
                                //This changes the times to string format 
                                //this.setState({beginTime: moment(value[0]).format("HH:mm")});
                                //this.setState({endTime: moment(value[1]).format("HH:mm")});
                                this.setState({beginTime: value[0].valueOf()});
                                this.setState({endTime: value[1].valueOf()});
                            }}
                            format={timeFormat} minuteStep={15}
                        /> */}
                    </Form.Item>
                    <Form.Item {...tailLayout} name="repeat" valuePropName="checked">
                        <Checkbox>Repeat</Checkbox>
                    </Form.Item>

                    {/* <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" onClick={this.handleCloseModal} style={{ background: "white", color: "#1890FF"}}>
                            Close
                            </Button>
                            <Button type="primary" htmlType="submit">
                            Submit 
                            </Button>
                        </Space>
                    </Form.Item>     */}
                    </Form>
            </Modal>
            </div>
        );
    }
}
export default AddEvents;