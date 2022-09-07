import { useState } from "react";
import { Button, Input } from "antd";
import ReqParamsComp, { ReqParamsType } from "./table";

const { Search } = Input;

const ReqParamsCompIndex: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [reqParams, setReqParams] = useState<ReqParamsType>({
        searchKey: ''
    });
    const handleSearch = (searchKey: string) => {
        setReqParams({
            ...reqParams,
            searchKey
        });
    }

    const handleClick = () => {
        setCount(c => c + 1)
    }

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <span className="ant-form-item-label">
                    <label>搜索</label>
                </span>
                <Search
                    placeholder="search"
                    style={{ width: 200 }}
                    onSearch={handleSearch}
                />
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={handleClick}
                > Click - {count}</Button>
            </div>
            <ReqParamsComp
                reqParams={reqParams}
                // 当setCount的时候，会创建新的obj传给reqParams
                // reqParams={{
                //     searchKey: reqParams.searchKey
                // }}
                count={count}
            />
        </div>
    )
}
export default ReqParamsCompIndex;
