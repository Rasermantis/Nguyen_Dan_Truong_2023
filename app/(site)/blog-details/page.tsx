"use client";
import UserData from "@/components/Auth/userData";
import BlogData from "@/components/Blog/blogData";
import CommentData from "@/components/Blog/commentData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleBlogPage = () => {
  const searchParams = useSearchParams();
  const currentBlogId = searchParams.get("_id");
  useEffect(() => {
    const url = `${searchParams}`;
  }, [searchParams]);

  const blogPost = BlogData.find(
    (blog) => blog.id.toString() === currentBlogId,
  );

  const blogComments = blogPost
    ? CommentData.filter((comment) => comment.post === blogPost.id)
    : [];

  const matchingUser = UserData.find((user) => user.id === blogPost?.owner);

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-full">
              {blogPost && (
                <div className="animate_top rounded-md bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="... col-span-2">
                      <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                        {blogPost.title}
                      </h2>

                      <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                        <li>
                          <span className="text-black dark:text-white">
                            Author:{" "}
                          </span>{" "}
                          {matchingUser ? matchingUser.name : "Unknown"}
                        </li>
                        <li>
                          <span className="text-black dark:text-white">
                            Published On: July 30, 2023
                          </span>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="...">
                      {blogPost && blogPost.tags && (
                        <ul className="mb-5 flex items-center gap-4">
                          <li>
                            <p className="text-black dark:text-white">Tags:</p>
                          </li>
                          {blogPost.tags.map((tag, index) => (
                            <li key={index}>
                              <a
                                href="#"
                                className="pr-2 duration-300 ease-in-out hover:text-primary"
                              >
                                #{tag}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="blog-details">
                    <p style={{ color: "white" }}>{blogPost.content}</p>
                  </div>

                  <div
                    className="mb-4 cursor-pointer text-white hover:text-primary"
                    onClick={toggleComments}
                  >
                    {blogComments.length} Replies
                  </div>
                  <hr />
                  {showComments &&
                    blogComments.map((comment) => {
                      const matchingUser = UserData.find(
                        (user) => user.id === comment.owner,
                      );
                      const authorName =
                        matchingUser && matchingUser.name
                          ? matchingUser.name
                          : "Anonymous";

                      return (
                        <div
                          key={comment.id}
                          className="relative mb-8 mt-11 grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 text-white shadow-lg dark:bg-blacksection"
                        >
                          <div className="relative flex gap-4">
                            <img
                              src="https://4.bp.blogspot.com/-FjY_-aRhANg/TVw-pT79gDI/AAAAAAAALyw/Ub10MJi3B40/s1600/enhanced-buzz-16855-1297795436-7.jpg"
                              className="relative -top-8 -mb-4 h-20 w-20 rounded-lg border bg-white"
                              alt=""
                              loading="lazy"
                            />
                            <div className="flex w-full flex-col text-white">
                              <div className="flex flex-row justify-between text-white">
                                <p className="relative overflow-hidden truncate whitespace-nowrap text-xl text-white">
                                  {authorName}
                                </p>
                                <a className="text-xl text-gray-500" href="#">
                                  <i className="fa-solid fa-trash"></i>
                                </a>
                              </div>
                              <p className="text-sm text-white">
                                {new Date(comment.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="-mt-4 text-white">{comment.content}</p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
