import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

const DebouncePage: React.FC = () => {
    // 搜索词
    const [searchTerm, setSearchTerm] = useState<string>('');
    // API搜索结果
    const [results, setResults] = useState<string[]>([]);
    // 搜索状态 (是否有正在等待的请求)
    const [isSearching, setIsSearching] = useState(false);
    // 对改变搜索词去抖动，只有当搜索词500毫秒内没有发生改变时，才会返回最新的值
    // 目标就是只有当用户停止输入时才会调用API，防止我们太过迅速频繁的调用API
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    // Effect for API call 
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                getTable(debouncedSearchTerm).then(results => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm] // 只有当去抖动后的搜索词改变时才会调用
    );

    return (
        <div>
            <input
                placeholder="Search Marvel Comics"
                onChange={e => setSearchTerm(e.target.value)}
            />

            {isSearching && <div>Searching ...</div>}

            {results.map(result => (
                <div key={result}>
                    <h4>{result}</h4>
                </div>
            ))}
        </div>
    );
}
export default DebouncePage;

// API search function
function getTable(searchKey: string) {
    return fetch(
        '/api/streamapp/service/streamDataSource/listTablesBySchema',
        {
            method: 'POST',
            body: JSON.stringify({
                isSys: false,
                schema: "",
                searchKey,
                sourceId: "1691"
            })
        }
    )
        .then(r => r.json())
        .then(r => {
            if (r.code === 1) {
                return r.data || []
            }
        })
        .catch(error => {
            console.error(error);
            return [];
        });
}