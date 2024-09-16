import { json, LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import data from "../../data.yaml";

export async function loader(args: LoaderFunctionArgs) {
    const { params } = args;
    const number = Number.parseInt(params.number as string);
    const exercise = data.exercises[number - 1];

    return json({exercise})
}

function Exercise() {
    const loaderData = useLoaderData() as { exercise: { content: string } };

    return (<div dangerouslySetInnerHTML={{__html:loaderData.exercise.content }} />);
}

export default Exercise;