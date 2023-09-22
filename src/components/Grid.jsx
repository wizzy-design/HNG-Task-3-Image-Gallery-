/* eslint-disable react/prop-types */


export default function Grid({ id, urls, user, alt_description}) {
 

  return (
    <>
      <div className="w-40 h-64 p-5 shadow-md rounded-2xl bg-slate-500">
        <div key={id} className="rounded-3xl">
          <img
            src={urls.regular}
            alt={user.username}
            className="object-contain w-full h-32"
          />
          <p className="z-30 pt-1 text-white">{alt_description}</p>
        </div>
      </div>
    </>
  );
}
