import { useEffect } from "react";
import { Router, withRouter } from 'next/router';

interface IProps {
    router: Router;
}

const RoutePage: React.FC<IProps> = ({ router }) => {
    useEffect(() => {
        console.log(router?.query?.id);
    }, [router]);

    router?.events?.on('routeChangeStart', (...args) => {
        console.log('路由开始变化', ...args)
        console.log(router?.query?.id)
    })
    router?.events?.on('hashChangeStart', (...args) => {
        console.log('hashChangeStart路由开始变化', ...args)
        console.log(router?.query?.id)
    })
    router?.events?.on('routeChangeComplete', () => {
        console.log('路由change完成', router?.query?.id)
    })

    return (
        <h1>Route Page</h1>
    )
}
export default withRouter(RoutePage);
