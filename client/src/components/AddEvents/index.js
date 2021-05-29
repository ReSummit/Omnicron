import React, {useState, updateTime} from 'react';
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import './AddEvents.css';

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

const timeFormat = 'HH:mm';
const rounded = Math.round(moment().minute() / 15) * 15;
const roundedDown = Math.floor(moment().minute() / 15) * 15;
const roundedUp = Math.ceil(moment().minute() / 15) * 15;

const {RangePicker} = TimePicker;

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
        fetch("http://localhost:5000/add", {
            method: "POST",

            body: JSON.stringify({
                eventName: this.eventName,
                repeating: this.repeating,
                people: this.people,
                time: {
                    start: this.state.beginTime,
                    end: this.state.endTime
                }, 
                decided: this.decided
            }),
        })
    }

    onFinish = (values) => {
        console.log('Success:', values);
        console.log(values)
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
            <button onClick={this.handleOpenModal}>Trigger Modal</button>
            <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example" onRequestClose={this.handleCloseModal}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
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

                    <Form.Item>
                        <DatePicker 
                            popupClassName="timepicker" 
                            defaultValue={moment()}
                        />
                        <RangePicker className="timepicker" defaultValue={[moment().minute(roundedUp).second(0), moment().minute(roundedUp).add(30, "minutes").second(0)]} format="HH:mm"
                            // Code to select and update time without pressing ok. UNFINISHED
                            // Default values only work if you open up and press okay
                            onOk={(value) => {;;
                                //This changes the times to string format 
                                //this.setState({beginTime: moment(value[0]).format("HH:mm")});
                                //this.setState({endTime: moment(value[1]).format("HH:mm")});
                                this.setState({beginTime: value[0].valueOf()});
                                this.setState({endTime: value[0].valueOf()});
                            }}
                        format={timeFormat} minuteStep={15}
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="Repeat" valuePropName="checked">
                        <Checkbox>Repeat</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit 
                        </Button>
                    </Form.Item>
                    </Form>
            </Modal>
            </div>
        );
    }
}
export default AddEvents;