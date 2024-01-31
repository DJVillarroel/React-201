import Hero from "./hero";

const PageNotFound = () => {
    return(
        <>
            <Hero text="Error 404: Page not found"/>
            <h1>We could not find the page you were looking for... Yes, it's your fault and you should feel bad</h1>
        </>
    )

}

export default PageNotFound;