import { createClient } from "contentful"
import Image from "next/image";
import {useRouter} from "next/router"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.CONTENTFULL_SPACE_ID,
  accessToken: process.env.CONTENTFULL_ACCESS_TOKEN
})
export async function getStaticPaths() {
     const response = await client.getEntries({content_type: 'recipe'})
     console.log("getStaticPaths: ", response.items)
     const paths = response.items.map(item => (
       {params: {slug: item?.fields?.slug}}
     ))
     return {
       paths,
       fallback: false // fallback: false means if path does not found the show 404 error
     }
}
export async function getStaticProps({params}){
     const {items} = await client.getEntries({content_type: 'recipe', 'fields.slug': params.slug})
     console.log("getStaticProps: ", items)
    //  if(!items) {
    //    return {
    //      notFound: true
    //    }
    //  }
     return {
       props: {
         recipe: items[0]
       },
       revalidate: 10
     }
}
export default function RecipeDetails({recipe}) {
  const router = useRouter();
  const {featuredImage, title, cookingTime, ingredients, method} = recipe.fields;
  // if (router.isFallback) {
	// 	return <h1>Loading...</h1>;
	// }
  return (
    <div>
      <div className="banner">
        <Image
        src={`https:${featuredImage.fields.file.url}`}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
        </div>
        <div className="info">
          <p>Take about {cookingTime} mins to cook.</p>
          <h3>Ingredients:</h3>
          {ingredients.map((ing, index) => (
            <span key={index}>{ing}</span>
          ))}
          </div>
          <div className="method">
            <h3>Method: </h3>
             <div>{documentToReactComponents(method)}</div>
            </div>
            <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  )
}