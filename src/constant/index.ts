import one from "../assets/categories/1.png"
import two from "../assets/categories/2.png"
import three from "../assets/categories/3.png"
import four from "../assets/categories/4.png"
import five from "../assets/categories/5.png"

export const HeroContent= [
    {
        id: 1,
        category:"Luxury",
        title: "Discover the World of Luxury NFTs",
        redirect:'/collections/luxury',
        current_bid: "0.5 ETH",
        image: one,
    },
    {
        id: 2,
        category: "Business",
        title: "Explore Business NFTs",
        redirect: '/collections/business',
        current_bid: "0.5 ETH",
        image: two,
    },
    {
        id: 3,
        category: "Wellness",
        title: "Discover Wellness NFTs",
        redirect: '/collections/wellness',
        current_bid: "0.5 ETH",
        image: three,
    },
    {
        id: 4,
        category: "Entertainment",
        title: "Explore Entertainment NFTs",
        redirect: '/collections/entertainment',
        current_bid: "0.5 ETH",
        image: four,
    },
    {
        id: 5,
        category: "Art",
        title: "Discover Art NFTs",
        redirect: '/collections/art',
        current_bid: "0.5 ETH",
        image: five,
    }

]
