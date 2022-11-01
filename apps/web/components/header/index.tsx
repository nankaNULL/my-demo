import { useEffect, useState } from 'react';
import Menu from 'antd/lib/menu';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps { }
const Header: React.FC<IProps> = () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>();
    const Router = useRouter();
    const getSelectedKeys = () => {
        const route = Router.route || '';
        if (route === '/') {
            setSelectedKeys(['index']);
            return;
        }
        setSelectedKeys([route.split('/')?.[1]])
    }
    useEffect(() => {
        getSelectedKeys()
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <Menu
                selectedKeys={selectedKeys}
                mode='horizontal'
            >
                <Menu.Item key="index">
                    <Link href="/">
                        <span>Index Page</span>
                    </Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="project"
                    title="Project Page"
                    onTitleClick={() => {
                        Router.push('/project')
                    }}
                >
                    <Menu.Item key="route">
                        <Link href="/project/routePage?id=1">
                            <span style={{ marginLeft: 20 }}>Route Page</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="api">
                        <Link href="/project/apiPage">
                            <span style={{ marginLeft: 20 }}>API Page</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="style">
                        <Link href="/project/stylePage">
                            <span style={{ marginLeft: 20 }}>Style Page</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="city"
                    title="City Page"
                    onTitleClick={() => {
                        Router.push('/city/wuhan/index')
                    }}
                >
                    <Menu.Item key="cityIndex">
                        <Link href="/city/wuhan/index">
                            <span style={{ marginLeft: 20 }}>Wuhan Index Page</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="hzcityIndex">
                        <Link href="/city/hanzhou/index">
                            <span style={{ marginLeft: 20 }}>Hangzhou Index Page</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="cityAbout">
                        <Link href="/project/apiPage">
                            <span style={{ marginLeft: 20 }}>API Page</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}
export default Header;
