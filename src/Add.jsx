import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import RichTextEditor from "./Component/RichTextEditor";
import CityAutocomplete from "./Component/CityAutocomplete";
const Add = () => {
  const RTEdata = {
    description: "",
    jobRequirements: "",
    companyDescription: "",
    location: "",
    type: "",
  };
  const fields = [
    { name: "title", placeholder: "Enter Job Title" },
    { name: "company", placeholder: "Enter Company Name" },
    { name: "companyLogo", placeholder: "Enter Company Logo URL", type: "url" },
    { name: "description", placeholder: "Enter Job Description", isRTE: true },
    {
      name: "experience",
      type: "object",
      fields: [
        { name: "min", placeholder: "Minimum Experience", type: "number" },
        { name: "max", placeholder: "Maximum Experience", type: "number" },
        { name: "unit", placeholder: "Experience Unit", type: "string", options: ["Months", "Years"] }
      ]
    },
    { name: "salary", placeholder: "Enter Salary Amount", type: "number" },
    { name: "jobRequirements", placeholder: "Enter Job Requirements", isRTE: true },
    { name: "companyDescription", placeholder: "Enter Company Description", isRTE: true },
    { name: "applyLink", placeholder: "Enter Application Link", type: "url" },
    { name: "postedBy", placeholder: "Enter Posted By (optional)" },
    { name: "skills", placeholder: "Enter Required Skills" },
    { name: "website", placeholder: "Enter Company Website (optional)", type: "url" }
  ];
  const handleAddJob = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData)
    if (data.min && data.max && data.unit) {
      data.experience = `${data.min}-${data.max} ${data.unit}`;
    } else {
      data.experience = "Not specified";
    }
    delete data.min;
    delete data.max;
    delete data.unit;
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
            : (field.type === "object" && field.name === "experience" ? (
              <div key={index}>
                <label className="block mb-1 text-sm text-gray-700">Experience</label>
                <div className="flex items-center justify-between flex-wrap max-sm:flex-col gap-2">
                  <input
                    type="text"
                    name="min"
                    placeholder="Min Exp"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="max"
                    placeholder="Max Exp"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    name="unit"
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  >
                    <option value="">Select</option>
                    {field.fields.find(f => f.name === "unit").options.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) :
              < div key={index} >
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
            )

        ))
        }
        <div>
          <label className="block mb-1 text-sm text-gray-700">
            Job Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="type"
            onChange={(e) => RTEdata.type = e.target.value}
          >
            <option value="None">Select type</option>
            <option value="In office">In office</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

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
      </form >
    </div >
  );
};

export default Add;
