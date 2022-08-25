import Mx from "mxgraph";

export const MxFactory = {
    config: {
        mxImageBasePath: 'public/mxgraph/images',
        mxLanguage: 'none',
        mxLoadResources: false,
        mxLoadStylesheets: false,
    },
    create: () => {
        return Mx(MxFactory.config);
    },
};
