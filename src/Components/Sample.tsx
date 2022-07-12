//import React from 'React';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
//const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

type SampleProps = {
    firstname: string
    lastname: string
}
const Sample = (props:SampleProps) =>{
    return(
        <div>
            <h1>{props.firstname} {props.lastname}</h1>
            <DatePicker defaultValue={moment('2015-06-06', dateFormat)} />
            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
        </div>
    )
}

export default Sample;