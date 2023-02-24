import Image from 'next/image';

const Page = ({ data, pageName }) => {
    console.log({ data, pageName });
    return (
        <div>
            <Image
                src={data.image}
                width={200}
                height={50}
                alt={data.title}
            />
            <h1>{data.title}</h1>
        </div>
    )
}

export default Page


export async function getStaticPaths() {
    const { allEvents } = await import('/data/data.json');
    const allPaths = allEvents.map(ev => {
        return {
            params: {
                cat: ev.city,
                id: ev.id.toString(),
            }
        }
    })
    console.log(allPaths)
    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    console.log(context);
    const { id } = context.params
    const { allEvents } = await import('/data/data.json');

    const eventData = allEvents.find(ev => ev.id === id)
    return {
        props: {
            data: eventData, pageName: id
        }
    }
}