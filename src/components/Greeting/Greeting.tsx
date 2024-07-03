import cssModules from '@/components/Greeting/Greeting.module.scss';
import Link from "next/link";

export default function Greeting() {
    return <>
        <div className={cssModules.greeting}>
            Welcome to Clario Test
        </div>
        <div className={cssModules.goToSignUp}>
            To test the flow, go to <Link href="/sign-up">Sign Up Page</Link>
        </div>
    </>
}