import cssModules from './Button.module.scss';

type Props = {
    title: string;
}

export default function Button({title}: Props) {
    return <div className={cssModules.wrapper}>
        <button className={cssModules.button}>
            {title}
        </button>
    </div>
}