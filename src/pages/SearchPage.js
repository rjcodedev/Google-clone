import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../component/Search";
import { useStateValue } from "../component/StateProvider";
import useGoogleSearch from "../hooks/useGoogleSearch";
import SearchIcon from "@mui/icons-material/Search";
// import BookIcon from "@mui/icons-material/Book";
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import ImageIcon from "@mui/icons-material/Image";
// import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchGif from "../assets/Search.gif";

const SearchPage = () => {
  const navigate = useNavigate();
  const [{ term }] = useStateValue();
  const { data, loader } = useGoogleSearch(term);
  // custome search enigne api
  // console.log(data);
  useEffect(() => {
    if (!term) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);
  return (
    <>
      <div className="flex px-2 justify-start sticky top-0 bg-white z-50 pt-[20px] pb-[10px]">
        <div className="mr-[20px] hidden md:block flex-none mt-[8px]">
          <Link to="/">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              alt=""
              className="h-[40px] object-contain"
            />
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="py-2 block md:hidden">
            <Link to="/">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                alt=""
                className="h-[40px] object-contain mx-auto"
              />
            </Link>
          </div>
          <Search hideButtons />
          <div className="flex space-x-2 mt-1 ml-1 text-[10px] md:text-xs font-medium text-gray-500">
            <Link to="/" className="p-1">
              <SearchIcon />
              All
            </Link>
            {/* <Link to="/" className="p-1">
              <BookIcon />
              Books
            </Link>{" "}
            <Link to="/" className="p-1">
              <NewspaperIcon />
              News
            </Link>{" "}
            <Link to="/" className="p-1">
              <ImageIcon />
              Images
            </Link>
            <Link to="/" className="p-1">
              <OndemandVideoIcon />
              Videos
            </Link>
            <div className="p-1">
              <MoreVertIcon />
            </div> */}
          </div>
        </div>
      </div>
      <hr className="bg-gray-300 w-full flex" />
      {term && (
        <>
          {loader ? (
            <div className="text-xl flex justify-center items-center text-center font-medium text-gray-700 m-4">
              <img
                src={SearchGif}
                alt="searching..."
                className="w-20 h-20 mx-auto"
              />
            </div>
          ) : (
            <>
              {data?.items.length > 0 ? (
                <div className="my-2 mx-2 md:mx-4">
                  <p className="mb-4 text-xs font-medium text-gray-600">
                    About {data?.searchInformation?.formattedTotalResults}{" "}
                    results ({data?.searchInformation?.formattedSearchTime}{" "}
                    seconds) for {term}
                  </p>
                  {data?.items?.map((item, index) => (
                    <div key={index} className="my-4 flex flex-col">
                      <a
                        className="text-xs hover:underline text-blue-800"
                        href={item?.link}
                      >
                        <p className="hover:no-underline no-underline text-gray-800">
                          {item?.displayLink}
                        </p>
                        <p className="text-base md:text-xl">{item?.title}</p>
                      </a>
                      <p className="text-sm">{item?.snippet}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xl font-medium text-gray-700 m-4">
                  Something went Wrong
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchPage;
