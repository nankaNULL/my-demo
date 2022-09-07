import Image from 'next/image';
import data from './data';
import { useMedia } from './useMedia';

type ImageType = {
    height: number;
    image: string;
}
const MediaPage = () => {
    const columnCount = useMedia(
        // 媒体查询
        ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
        // 列数 （跟上方的媒体查询数组根据下标相关）
        [5, 4, 3],
        // 默认列数
        2
    );

    // 创建一个默认的列高度数组，以0填充
    let columnHeights = new Array(columnCount).fill(0);

    // 创建一个数组用来储存每列的元素，数组的每一项为一个数组
    let columns: any[] = Array.from(Array(columnCount), () => []);

    data.forEach((item, index) => {
        // 获取高度最矮的那一项
        const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        // 添加item
        columns[shortColumnIndex].push(item);
        // 更新高度
        columnHeights[shortColumnIndex] += item.height;
    });

    // 渲染每一列和其中的元素
    return (
        <div style={{ display: 'flex' }}>
            {columns?.map((column, index) => (
                <div
                    key={index}
                    style={{ marginLeft: 10 }}
                >
                    {column.map((item: ImageType) => (
                        <div
                            key={item.image}
                            style={{ fontSize: 0, marginBottom: 10 }}
                        >
                            <Image
                                src={item.image}
                                alt=""
                                width="200px"
                                height={item.height}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
export default MediaPage;
