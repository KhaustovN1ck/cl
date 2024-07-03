import {PropsWithChildren} from "react";
import cssModules from '@/components/Layout/Layout.module.scss';

export default function Layout({children}: PropsWithChildren) {
    return <div className={cssModules.wrapper}>
        {children}
    </div>
}