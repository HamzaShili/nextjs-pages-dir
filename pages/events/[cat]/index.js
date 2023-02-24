import Image from 'next/image';
import Link from 'next/link';

const Page = ({ data, pageName }) => {
    return (
        <div>
            <h1>Event in {pageName}</h1>
            <div>
                {
                    data.map(ev => (
                        <Link
                            key={ev.id}
                            href={`/events/${ev.city}/${ev.id}`}
                        >
                            <Image
                                src={ev.image}
                                width={200}
                                height={50}
                                alt={ev.title}
                            />
                            <h2>{ev.title}</h2>
                            <p>{ev.description}</p>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}

export default Page

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map(ev => {
        return {
            params: {
                cat: ev.id.toString(),
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
    const { cat } = context.params
    const { allEvents } = await import('/data/data.json');

    const data = allEvents.filter(ev => ev.city === cat)
    return {
        props: {
            data, pageName: cat
        }
    }
}