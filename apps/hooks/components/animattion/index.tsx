import React from 'react';
import { useAnimation } from './useAnimateTest';


const Ball = ({ innerStyle }: { innerStyle: React.CSSProperties }) => (
    <div
        style={{
            width: 100,
            height: 100,
            marginRight: '40px',
            borderRadius: '50px',
            backgroundColor: '#4dd5fa',
            ...innerStyle
        }}
    />
);

const Animation = () => {
    // 在不同的启动延迟去多次调用hook以获得不同的动画值
    const animation1 = useAnimation('elastic', 600, 0);
    const animation2 = useAnimation('elastic', 600, 150);
    const animation3 = useAnimation('elastic', 600, 300);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Ball
                innerStyle={{
                    marginTop: animation1 * 200 - 100
                }}
            />

            <Ball
                innerStyle={{
                    marginTop: animation2 * 200 - 100
                }}
            />

            <Ball
                innerStyle={{
                    marginTop: animation3 * 200 - 100
                }}
            />
        </div>
    );
}
export default Animation;