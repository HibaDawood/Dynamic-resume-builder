"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeWorkExperience");
const resumeSkills = document.getElementById("resumeSkills");
const downloadpdfButton = document.getElementById("download-pdf");
const editButton = document.getElementById("editButton");
const backButton = document.getElementById("backButton");
const resumeContent = document.getElementById("resumeContent");
if (!resumeContent) {
    console.error("Error: resumeContent element not found");
}
else {
    console.log("resumeContent found", resumeContent);
}
const shareLinkButton = document.getElementById("shareLinkButton");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education")
        .value;
    const workExperience = document.getElementById("workExperience").value;
    const skills = document.getElementById("skills")
        .value;
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = "";
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    resumeName.textContent = name;
    resumeEmail.textContent = `Email : ${email}`;
    resumePhone.textContent = `Phone : ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    const queryParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        degree: degree,
        education: education,
        workExperience: workExperience,
        skills: skills,
    });
    const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`;
    shareLinkButton.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueUrl);
        alert("Shareable link copied to clipboard!");
    });
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
backButton.addEventListener("click", () => {
    var _a;
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
    window.history.replaceState(null, "", "/");
});
editButton.addEventListener("click", () => {
    var _a;
    updateFormFromResume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormFromResume() {
    var _a, _b, _c;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split("from")) || [];
    document.getElementById("name").value =
        resumeName.textContent || "";
    document.getElementById("email").value =
        ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace("Email: ", "")) || "";
    document.getElementById("phone").value =
        ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace("Phone: ", "")) || "";
    document.getElementById("degree").value = degree || "";
    document.getElementById("education").value =
        education || "";
    document.getElementById("workExperience").value =
        resumeWorkExperience.textContent || "";
    document.getElementById("skills").value =
        resumeSkills.textContent || "";
}
downloadpdfButton.addEventListener("click", () => {
    if (typeof html2pdf === "undefined") {
        alert("Error : html2pdf library is not loaded");
        return;
    }
    if (!resumeContent) {
        console.error("Error: resumeContent element not found");
        return;
    }
    else {
        console.log("html2pdf library is loaded");
    }
    const resumeOptions = {
        margin: 0.5,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "potrait" },
    };
    html2pdf()
        .from(resumeContent)
        .save()
        .set(resumeOptions)
        .catch((error) => {
        console.error("PDF generation error", error);
    });
});
window.addEventListener("DOMContentLoaded", () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const degree = params.get("degree") || "";
    const education = params.get("education") || "";
    const workExperience = params.get("workExperience") || "";
    const skills = params.get("skills") || "";
    if (name ||
        email ||
        phone ||
        degree ||
        education ||
        workExperience ||
        skills) {
        resumeName.textContent = name;
        resumeEmail.textContent = `Email : ${email}`;
        resumePhone.textContent = `Phone : ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;
        const savedPhoto = localStorage.getItem("resumePhoto");
        if (savedPhoto) {
            resumePhoto.src = savedPhoto;
        }
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
resumePhoto.style.width = "150px";
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%";
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";
resumePhoto.style.backgroundColor = "rgba(134, 206, 196, 0.945)";
