import Image from 'next/image';
import Link from 'next/link';

const Page = ({ data }) => {
    return (
        <div>
            <h1>Events Page</h1>
            {data.map(ev => (
                <Link
                    key={ev.id}
                    href={`events/${ev.id}`}>
                    <Image
                        src={ev.image}
                        width={200}
                        height={50}
                        alt={ev.title}
                    />
                    <h2>{ev.title}</h2>
                    <p>{ev.description}</p>
                </Link>
            ))}

        </div>

    )
}

export default Page

export async function getStaticProps() {
    const { events_categories } = await import('/data/data.json');
    console.log(events_categories)
    return {
        props: {
            data: events_categories
        }
    }
}


