import { useRef, useState } from "react";
import { Table } from "antd";
import { cloneDeep, isEqual } from 'lodash';
import React from "react";
import { useDeepEffect } from "./useDeepEffect";

export type ReqParamsType = {
    searchKey: string;
}

interface IProps {
    reqParams: ReqParamsType;
    count: number;
}
const ReqParamsComp: React.FC<IProps> = (props) => {
    let curRef: any = useRef();
    console.log(isEqual(curRef.current, props.reqParams), curRef.current === props.reqParams);
    curRef.current = props.reqParams;

    const { reqParams, count } = props;
    const [dataSource, setDataSource] = useState<any[]>([]);
    const columns = [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            render: (id: string) => id ?? '-'
        }, {
            key: 'name',
            dataIndex: 'name',
            title: '名称',
            render: (name: string) => name || '-'
        }
    ]

    const getData = () => {
        const newDataSource = cloneDeep(dataSource);
        const len = newDataSource?.length || 0;
        const item = {
            id: len,
            name: 'item' + len
        }
        newDataSource.push(item);
        setDataSource(newDataSource);
    }

    useDeepEffect(() => {
        getData();
    }, [reqParams])

    return (
        <Table
            rowKey="id"
            size="small"
            bordered
            columns={columns}
            dataSource={dataSource}
        />
    )
}
export default ReqParamsComp;
