import ListingCard from "./ListingCard";

export default function ListingsGrid({ listings }) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
      {listings.map((item, index) => (
        <ListingCard key={index} item={item} />
      ))}
    </div>
  );
}
