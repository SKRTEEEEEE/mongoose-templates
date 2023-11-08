import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Pet from '../../models/Pet';

const PetsPage = ({ pets }) => {
  if (!pets) {
    // Manejar el caso en que pets es undefined
    return <p>No hay mascotas disponibles.</p>;
  }

  return (
    <>
      {pets.map((pet) => (
        <div key={pet._id}>
          <div className="card">
            <img src={pet.image_url} alt={pet.name} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>
              {/* Resto del contenido */}

              {/* Extra Pet Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href={`/pets/${pet._id}/edit`}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={`/pets/${pet._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PetsPage;

export const getServerSideProps = async () => {
  await dbConnect();

  const result = await Pet.find({});
  const pets = JSON.parse(JSON.stringify(result));

  return {
    props: {
      pets,
    },
  };
};
