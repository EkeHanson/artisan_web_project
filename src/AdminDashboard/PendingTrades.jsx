// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import MyLocation from "@mui/icons-material/MyLocation";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import UserPlaceholder from "./Img/user-placeholder.png";
// import FlashMessage from "../FlashMessage/FlashMessage.jsx";

// const PendingTrades = () => {

//   const [flash, setFlash] = useState(null);    
//   const showMessage = (message, type) => {
//     setFlash({ message, type });
//   };

//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [jobs, setJobs] = useState([]); // State to hold job data
//   const [loading, setLoading] = useState(true); // State to track loading state
//   const [error, setError] = useState(null); // State to track errors
//   const [deletingJobId, setDeletingJobId] = useState(null); // Track job being deleted

//   useEffect(() => {
//     // Fetch data from API
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch jobs");
//         }
//         const data = await response.json();

//         // Filter only completed jobs
//         const inCompletedJobs = data.results.filter(
//           //(job) => !job.artisan_done && job.customer_done && job.admin_done
//           (job) => !job.customer_done
//         );
//         setJobs(inCompletedJobs);
        
//         //setJobs(data.results); // Set jobs data
//         // console.log("inCompletedJobs")
//         // console.log(inCompletedJobs)
//         // console.log("inCompletedJobs")


//       } catch (error) {
//         setError(error.message); // Set error message
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this job?");
//     if (confirmDelete) {
//       setDeletingJobId(jobId); // Set the job being deleted
//       try {
//         const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/${jobId}/`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to delete the job. Please try again.");
//         }
  
//         // Remove the deleted job from the list
//         setJobs(jobs.filter((job) => job.id !== jobId));
//         showMessage("Job deleted successfully!", "failure");
//       } catch (error) {
//         console.error("Failed to delete job:", error);
//         showMessage(error.message || "An error occurred while deleting the job.", "failure");
//       } finally {
//         setDeletingJobId(null); // Clear the deleting state
//       }
//     }
//   };
  
//   if (loading) {
//     return <p>Loading jobs...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="Gen_Admin_BBD">
//       <div className="Gradnded-main">
//         <div className="Gradnded-Box AA_hha">
//           <div className="Gradnded-Box-header">
//             <h2 className="big-text">Pending Jobs</h2>
//           </div>

//           {flash && (
//               <FlashMessage
//                 message={flash.message}
//                 type={flash.type}
//                 onClose={() => setFlash(null)}
//               />
//             )}

//           <div className="Habgb-sec">
//             <div className="My-Artisan-Body">
//               <div className="garoo-Gird-part2">


//               {jobs.length === 0 ? (
//                 <p style={{ textAlign: "center", fontSize: "18px", color: "#888", marginTop: "20px" }}>
//                   There are no pending jobs.
//                 </p>
//               ) : (
//                 jobs.map((job) => (
//                   <div className="Carded-Box" key={job.id}>
//                     <div className="Carded-Box-Gridd">
//                       <div className="Carded-Box-2">
//                         <div className="oo-dlsts">
//                           <h3>
//                             {job.title}{" "}
//                             <span>
//                               <AccessTimeIcon /> {new Date(job.created_at).toLocaleDateString()}
//                             </span>
//                           </h3>
//                           <div className="oo-dlsts-110">
//                             <div className="oo-dlsts-OO1">
//                               <h5>
//                                 <MyLocation /> {job.location}
//                               </h5>
//                             </div>
//                             <div className="oo-dlsts-OO2">
//                               <h4>
//                                 <span>
//                                   <Visibility /> 16.2k
//                                 </span>
//                               </h4>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="GLnad-btns">
//                           <div className="GLnad-btns-1">
//                             <span>{job.service_details.postName}</span>
//                             <span>
//                               <BusinessCenterIcon /> {job?.num_appllications}{" "}
//                               {job?.num_appllications > 1 ? "Applications" : "Application"}
//                             </span>
//                           </div>
//                           <div className="GLnad-btns-2">
//                             <Link 
//                               to={{ pathname: "/admin/job-artisans" }} 
//                               state={{ job }}
//                             >
//                               View Artisans
//                             </Link>
//                             <button
//                               className="rwmovooo-btn"
//                               onClick={() => handleDelete(job.id)}
//                               disabled={deletingJobId === job.id}
//                             >
//                               <DeleteIcon />
//                               <span>
//                                 {deletingJobId === job.id ? "Deleting..." : "Remove Job"}
//                               </span>
//                             </button>
//                           </div>
//                         </div>
//                         <div className="ahhgs-sec">
//                           <h3>
//                             <img src={UserPlaceholder} alt="User" /> {job.customer}
//                           </h3>
//                           <p>
//                             <CheckCircleIcon /> {job.status === "open" ? "Active" : "Inactive"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PendingTrades;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import MyLocation from "@mui/icons-material/MyLocation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UserPlaceholder from "./Img/user-placeholder.png";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const PendingTrades = () => {
  const [flash, setFlash] = useState(null);
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track errors
  const [deletingJobId, setDeletingJobId] = useState(null); // Track job being deleted
  const [nextPage, setNextPage] = useState(null); // URL for the next page
  const [prevPage, setPrevPage] = useState(null); // URL for the previous page

  const fetchJobs = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();

      // Filter only pending jobs (jobs where customer_done is false)
      const pendingJobs = data.results.filter((job) => !job.customer_done);
      setJobs(pendingJobs); // Set filtered jobs data
      setNextPage(data.next); // Set next page URL
      setPrevPage(data.previous); // Set previous page URL
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    // Fetch initial data from API
    fetchJobs(`${djangoHostname}/api/jobs/auth/api/jobs/`);
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      setDeletingJobId(jobId); // Set the job being deleted
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/${jobId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete the job. Please try again.");
        }

        // Remove the deleted job from the list
        setJobs(jobs.filter((job) => job.id !== jobId));
        showMessage("Job deleted successfully!", "failure");
      } catch (error) {
        console.error("Failed to delete job:", error);
        showMessage(error.message || "An error occurred while deleting the job.", "failure");
      } finally {
        setDeletingJobId(null); // Clear the deleting state
      }
    }
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="Gen_Admin_BBD">
      <div className="Gradnded-main">
        <div className="Gradnded-Box AA_hha">
          <div className="Gradnded-Box-header">
            <h2 className="big-text">Pending Jobs</h2>
          </div>

          {flash && (
            <FlashMessage
              message={flash.message}
              type={flash.type}
              onClose={() => setFlash(null)}
            />
          )}

          <div className="Habgb-sec">
            <div className="My-Artisan-Body">
              {jobs.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", color: "#888", marginTop: "20px" }}>
                  There are no pending jobs.
                </p>
              ) : (
                <div className="garoo-Gird-part2">
                  {jobs.map((job) => (
                    <div className="Carded-Box" key={job.id}>
                      <div className="Carded-Box-Gridd">
                        <div className="Carded-Box-2">
                          <div className="oo-dlsts">
                            <h3>
                              {job.title}{" "}
                              <span>
                                <AccessTimeIcon /> {new Date(job.created_at).toLocaleDateString()}
                              </span>
                            </h3>
                            <div className="oo-dlsts-110">
                              <div className="oo-dlsts-OO1">
                                <h5>
                                  <MyLocation /> {job.location}
                                </h5>
                              </div>
                              <div className="oo-dlsts-OO2">
                                <h4>
                                  <span>
                                    <Visibility /> 16.2k
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="GLnad-btns">
                            <div className="GLnad-btns-1">
                              <span>{job.service_details.postName}</span>
                              <span>
                                <BusinessCenterIcon /> {job?.num_appllications}{" "}
                                {job?.num_appllications > 1 ? "Applications" : "Application"}
                              </span>
                            </div>
                            <div className="GLnad-btns-2">
                              <Link
                                to={{ pathname: "/admin/job-artisans" }}
                                state={{ job }}
                              >
                                View Artisans
                              </Link>
                              <button
                                className="rwmovooo-btn"
                                onClick={() => handleDelete(job.id)}
                                disabled={deletingJobId === job.id}
                              >
                                <DeleteIcon />
                                <span>
                                  {deletingJobId === job.id ? "Deleting..." : "Remove Job"}
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="ahhgs-sec">
                            <h3>
                              <img src={UserPlaceholder} alt="User" /> {job.customer}
                            </h3>
                            <p>
                              <CheckCircleIcon /> {job.status === "open" ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="pagination">
            <button
              onClick={() => fetchJobs(prevPage)}
              disabled={!prevPage}
            >
              Previous
            </button>
            <button
              onClick={() => fetchJobs(nextPage)}
              disabled={!nextPage}
            >
              Next
            </button>
          </div>

          {/* Display a message when no more jobs are available */}
          {!nextPage && jobs.length > 0 && (
            <p className="no-more-jobs-message">No more jobs to load.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingTrades;