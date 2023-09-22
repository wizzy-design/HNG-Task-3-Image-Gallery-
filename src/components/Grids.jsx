/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Grid from "./Grid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Grids = ({ keyWord }) => {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return; // If there was no destination

    if (
      source.draggableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedImages = [...images];

      const imagesourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedImages] = reorderedImages.splice(imagesourceIndex, 1);
      reorderedImages.splice(storeDestinatonIndex, 0, removedImages); // remove 0 element, add removedImages in the storeDestinationIndex

      return setImages(reorderedImages);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=${apiKey}&per_page=20`
      );
      const data = await response.json();
      console.log(data);
      setImages(data);
    };

    const unsuscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    fetchImages();

    return () => unsuscribe();
  }, []);

  return (
    <>
      <div className="container px-5 pt-24 mx-auto 2xl:px-32">
        {/* Welcome Message */}
        {user ? (
          <div className="flex items-center text-slate-800">
            <span>
              Welcome <span className="font-bold">{user.email}</span> to your{" "}
            </span>
            <h1 className="py-4 pl-2 text-3xl font-bold text-slate-800 md:text-4xl">
              {" "}
              Gallery
            </h1>
          </div>
        ) : (
          <h1 className="py-4 text-3xl font-bold text-slate-800 md:text-4xl">
            Gallery
          </h1>
        )}

        {user ? (
          // If user is logged in they can drag and drop
          <DragDropContext onDragEnd={handleDragDrop}>
            <div>
              {!images ? (
                <div>
                  <h1>Loading...</h1>
                </div>
              ) : (
                <div>
                  <Droppable droppableId="ROOT" type="group">
                    {/* <div */}
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid w-auto grid-cols-2 gap-5 pb-20 md:grid-cols-6"
                      >
                        {images
                          .filter((image) => {
                            if (keyWord == " ") {
                              return image;
                            } else if (
                              image.alt_description
                                .toLowerCase()
                                .includes(keyWord.toLowerCase())
                            ) {
                              return image; // filtered images
                            }
                          })
                          .map((image, index) => (
                            <Draggable
                              draggableId={image.id}
                              key={image.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <Grid key={image.id} {...image} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                    {/* </div> */}
                  </Droppable>
                </div>
              )}
            </div>
          </DragDropContext>
        ) : (
          <div>
            <div className="text-2xl font-bold text-slate-800">
              Login to see gallery clearly
            </div>
            <section className="grid w-auto grid-cols-1 gap-5 pb-20 md:grid-cols-2 xl:grid-cols-4 lg:container opacity-5">
              {images.map((image) => (
                <Grid key={image.id} {...image} />
              ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default Grids;
