import ListingCard from "./ListingCard";

export default function ListingGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {listings.map((item) => (
        <ListingCard key={item._id} item={item} />
      ))}
    </div>
  );
}