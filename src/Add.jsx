
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import RichTextEditor from "./Component/RichTextEditor";
import CityAutocomplete from "./Component/CityAutocomplete"; // Import the new component

const Add = () => {
  const RTEdata = {
    description: "",
    jobRequirements: "",
    companyDescription: "",
    location: "",
  };
  const fields = [
    { name: "title", placeholder: "Enter Job Title" },
    { name: "company", placeholder: "Enter Company Name" },
    { name: "companyLogo", placeholder: "Enter Company Logo URL", type: "url" },
    { name: "description", placeholder: "Enter Job Description", isRTE: true },
    { name: "experience", placeholder: "Enter Required Experience", type: "number" },
    { name: "type", placeholder: "Select Job Type" },
    { name: "salary", placeholder: "Enter Salary Amount", type: "number" },
    { name: "salaryType", placeholder: "Select Salary Type" },
    { name: "jobRequirements", placeholder: "Enter Job Requirements", isRTE: true },
    { name: "companyDescription", placeholder: "Enter Company Description", isRTE: true },
    { name: "applyLink", placeholder: "Enter Application Link", type: "url" },
    { name: "postedBy", placeholder: "Enter Posted By (optional)" },
    { name: "skills", placeholder: "Enter Required Skills" },
    { name: "about", placeholder: "Enter About Section (optional)" },
    { name: "website", placeholder: "Enter Company Website (optional)", type: "url" }
  ];
  const handleAddJob = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData)
    try {
      await addDoc(collection(db, "jobs"), {
        ...data, ...RTEdata, createdAt: serverTimestamp()
      });
      alert("Job added successfully!");
      event.target.reset();
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + error.message);
    }
  };

  const handleLocationChange = (value) => {
    RTEdata.location = value;
  };

  const jobCategories = [
    "Marketing",
    "Engineering",
    "Design",
    "Finance",
    "Sales",
    "HR",
    "IT Support",
    "Operations",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Add a New Job
      </h2>

      <form method="POST" onSubmit={handleAddJob} className="space-y-5">
        {fields.map((field, index) => (
          field.isRTE ?
          <div>
            <label className="block mb-1 text-sm text-gray-700 capitalize">
                {field.placeholder}
            </label>
            <RichTextEditor
              placeholder={field.placeholder}
              onChange={(value) => RTEdata[field.name] = value}
              key={field.name}
            /> 
            </div> 
            :
            <div key={index}>
              <label className="block mb-1 text-sm text-gray-700 capitalize">
                {field.placeholder}
              </label>

              <input
                key={field.name}
                id={field.name}
                type={field?.type || "text"}
                placeholder={field.placeholder}
                name={field.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

        ))}

        {/* Replace the location input with the autocomplete component */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Location *</label>
          <CityAutocomplete
            value={location}
            onChange={handleLocationChange}
            placeholder="Search for Indian cities..."
            required={true}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">Job Category</label>
          <select
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
            required
          >
            <option value="" disabled>Select category</option>
            {jobCategories.map((cat) => (
              <option value={cat} key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default Add;
