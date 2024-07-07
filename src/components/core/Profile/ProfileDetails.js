import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../../services/operations/profile'; // Adjust the import path as necessary

const ProfileDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    const loading = useSelector((state) => state.profile.loading);
  
    useEffect(() => {
      if (token) {
        dispatch(getUserDetails(token));
      } else {
        navigate('/login');
      }
    }, [dispatch, token, navigate]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>No user data available.</div>;
    }
  
    const renderField = (label, value) => {
      if (value) {
        return (
          <p key={label}>
            <strong>{label}:</strong> {value}
          </p>
        );
      }
      return null;
    };
    const renderArrayFields = (array, fieldName) => {
      return array.map((item, index) => ({
        label: `${fieldName} ${index + 1}`,
        value: Object.entries(item)
          .filter(([key]) => key !== '_id')
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      }));
    };
  
    const renderSection = (title, fields) => {
      const renderedFields = fields.filter(field => field.value).map(field => renderField(field.label, field.value));
      
      if (renderedFields.length > 0) {
        return (
          <div key={title}>
            <h2>{title}</h2>
            {renderedFields}
          </div>
        );
      }
      return null;
    };
  
    const sections = [
      {
        title: "Personal Information",
        fields: [
          { label: "Father's Name", value: user.additionalDetails?.fatherName },
          { label: "Mother's Name", value: user.additionalDetails?.motherName },
          { label: "Guardian's Name", value: user.additionalDetails?.guardianName },
          { label: "Guardian's Relation", value: user.additionalDetails?.guardianRelation },
          { label: "Date of Birth", value: user.additionalDetails?.birthDate },
          { label: "Birth Place", value: user.additionalDetails?.birthPlace },
          { label: "Birth Time", value: user.additionalDetails?.birthTime },
          { label: "Gender", value: user.additionalDetails?.gender },
          { label: "Height", value: user.additionalDetails?.height },
          { label: "Weight", value: user.additionalDetails?.weight },
          { label: "Blood Group", value: user.additionalDetails?.bloodGroup },
          { label: "Color", value: user.additionalDetails?.color },
          { label: "Feast", value: user.additionalDetails?.feast },
          { label: "Previous Disease", value: user.additionalDetails?.previousDisease },
          { label: "Identity Mark", value: user.additionalDetails?.identityMark },
          { label: "Marital Status", value: user.additionalDetails?.maritalStatus },
          { label: "Residence Type", value: user.additionalDetails?.residenceType },
          { label: "Gotra", value: user.additionalDetails?.gotra },
          { label: "Gotra Mama", value: user.additionalDetails?.gotraMama },
          { label: "Religion", value: user.additionalDetails?.religion },
          { label: "Caste", value: user.additionalDetails?.caste },
          { label: "Upcaste", value: user.additionalDetails?.upcaste },
          { label: "Manglik Status", value: user.additionalDetails?.manglikStatus ? "Yes" : "No" },
        ]
      },
      {
        title: "Education",
        fields: [
          { label: "Secondary", value: user.additionalDetails?.education?.secondary },
          { label: "Secondary Year", value: user.additionalDetails?.education?.secondaryYear },
          { label: "Secondary Board", value: user.additionalDetails?.education?.secondaryBoard },
          { label: "Secondary Marks", value: user.additionalDetails?.education?.secondaryMarks },
          { label: "Senior Secondary", value: user.additionalDetails?.education?.seniorSecondary },
          { label: "Senior Secondary Year", value: user.additionalDetails?.education?.seniorSecondaryYear },
          { label: "Senior Secondary Board", value: user.additionalDetails?.education?.seniorSecondaryBoard },
          { label: "Senior Secondary Marks", value: user.additionalDetails?.education?.seniorSecondaryMarks },
          { label: "Graduation", value: user.additionalDetails?.education?.graduation },
          { label: "Graduation Year", value: user.additionalDetails?.education?.graduationYear },
          { label: "University Name", value: user.additionalDetails?.education?.universityName },
          { label: "Graduation Marks", value: user.additionalDetails?.education?.graduationMarks },
          { label: "Post Graduation", value: user.additionalDetails?.education?.postGraduation },
          { label: "Post Graduation Year", value: user.additionalDetails?.education?.postGraduationYear },
          { label: "Post Graduation University", value: user.additionalDetails?.education?.postGraduationUniversityName },
          { label: "Post Graduation Marks", value: user.additionalDetails?.education?.postGraduationMarks },
          { label: "Other Education", value: user.additionalDetails?.education?.other },
          { label: "Diploma", value: user.additionalDetails?.education?.diploma },
          { label: "Diploma Year", value: user.additionalDetails?.education?.diplomaYear },
          { label: "Diploma Board", value: user.additionalDetails?.education?.diplomaBoard },
          { label: "Diploma Marks", value: user.additionalDetails?.education?.diplomaMarks },
        ]
      },
      {
        title: "Contact Information",
        fields: [
        { label: "Contact Number", value: user.additionalDetails?.contacts?.contactNumber },
        { label: "Facebook", value: user.additionalDetails?.contacts?.facebook },
        { label: "Instagram", value: user.additionalDetails?.contacts?.instagram },
        { label: "WhatsApp Number", value: user.additionalDetails?.contacts?.whatsappNumber },
        { label: "Backup Contact", value: user.additionalDetails?.contacts?.backupContact },
        { label: "Permanent Address", value: user.additionalDetails?.contacts?.permanentAddress },
        { label: "Current Address", value: user.additionalDetails?.contacts?.currentAddress },
      ]
      },
      {
        title: "Family Details",
        fields: [
          { label: "Father's Age", value: user.additionalDetails?.familyDetails?.fatherAge },
          { label: "Father's Health", value: user.additionalDetails?.familyDetails?.fatherHealth },
          { label: "Father's Death Age", value: user.additionalDetails?.familyDetails?.fatherDeathAge },
          { label: "Father's Death Year", value: user.additionalDetails?.familyDetails?.fatherDeathYear },
          { label: "Mother's Age", value: user.additionalDetails?.familyDetails?.motherAge },
          { label: "Mother's Health", value: user.additionalDetails?.familyDetails?.motherHealth },
          { label: "Mother's Death Age", value: user.additionalDetails?.familyDetails?.motherDeathAge },
          { label: "Mother's Death Year", value: user.additionalDetails?.familyDetails?.motherDeathYear },
        ]
      },
      {
        title: "Occupation",
        fields: [
          { label: "Income Source", value: user.additionalDetails?.occupation?.incomeSource },
          { label: "Employer Name", value: user.additionalDetails?.occupation?.employerName },
          { label: "Nature of Work", value: user.additionalDetails?.occupation?.natureWork },
          { label: "Completed Period", value: user.additionalDetails?.occupation?.completedPeriod },
          { label: "Annual Income", value: user.additionalDetails?.occupation?.annualIncome },
          { label: "Other Sources", value: user.additionalDetails?.occupation?.otherSources },
          { label: "Financial Responsibility", value: user.additionalDetails?.occupation?.financialResponsibility },
          { label: "Member Responsibility", value: user.additionalDetails?.occupation?.memberResponsibility },
        ]
      },
      {
        title: "Father's Family",
        fields: [
          { label: "Grandfather's Name", value: user.additionalDetails?.fatherFamily?.grandFather },
          { label: "Grandmother's Name", value: user.additionalDetails?.fatherFamily?.grandMother },
          { label: "Grandfather's Age", value: user.additionalDetails?.fatherFamily?.grandFatherAge },
          { label: "Grandmother's Age", value: user.additionalDetails?.fatherFamily?.grandMotherAge },
          { label: "Grandfather's Status", value: user.additionalDetails?.fatherFamily?.grandFatherStatus ? "Alive" : "Deceased" },
          { label: "Grandmother's Status", value: user.additionalDetails?.fatherFamily?.grandMotherStatus ? "Alive" : "Deceased" },
          ...(user.additionalDetails?.fatherFamily?.bua ? renderArrayFields(user.additionalDetails.fatherFamily.bua, "Aunt (Bua)") : []),
          ...(user.additionalDetails?.fatherFamily?.tau ? renderArrayFields(user.additionalDetails.fatherFamily.tau, "Uncle (Tau)") : []),
          ...(user.additionalDetails?.fatherFamily?.chacha ? renderArrayFields(user.additionalDetails.fatherFamily.chacha, "Uncle (Chacha)") : []),
        ]
      },
      {
        title: "Mother's Family",
        fields: [
          { label: "Grandmother's Name", value: user.additionalDetails?.motherFamily?.grandMother },
          { label: "Grandmother's Age", value: user.additionalDetails?.motherFamily?.grandMotherAge },
          { label: "Grandmother's Status", value: user.additionalDetails?.motherFamily?.grandMotherStatus ? "Alive" : "Deceased" },
          ...(user.additionalDetails?.motherFamily?.mama ? renderArrayFields(user.additionalDetails.motherFamily.mama, "Uncle (Mama)") : []),
          ...(user.additionalDetails?.motherFamily?.mausi ? renderArrayFields(user.additionalDetails.motherFamily.mausi, "Aunt (Mausi)") : []),
        ]
      },
      {
        title:"Friends",
        fields: [
          { label: "First Friend Name", value: user.additionalDetails?.friends?.firstFriendName },
          { label: "First Friend Contact", value: user.additionalDetails?.friends?.firstFriendContact },
          { label: "First Friend Address", value: user.additionalDetails?.friends?.firstFriendAddress },
          { label: "First Friend Relation", value: user.additionalDetails?.friends?.firstFriendRelation },
          { label: "Second Friend Name", value: user.additionalDetails?.friends?.secondFriendName },
          { label: "Second Friend Contact", value: user.additionalDetails?.friends?.secondFriendContact },
          { label: "Second Friend Address", value: user.additionalDetails?.friends?.secondFriendAddress },
          { label: "Seconf Friend Relation", value: user.additionalDetails?.friends?.secondFriendRelation },
        ]

      },
      {
        title: "Property",
        fields: [
          { label: "House Owner", value: user.additionalDetails?.property?.houseOwner },
          { label: "House Address", value: user.additionalDetails?.property?.houseAddress },
          { label: "House Price", value: user.additionalDetails?.property?.housePrice },
          { label: "House Loan", value: user.additionalDetails?.property?.houseLoan },
          { label: "Flat Owner", value: user.additionalDetails?.property?.flatOwner },
          { label: "Flat Address", value: user.additionalDetails?.property?.flatAddress },
          { label: "Flat Type", value: user.additionalDetails?.property?.flatType },
          { label: "Flat Price", value: user.additionalDetails?.property?.flatPrice },
          { label: "Flat Loan", value: user.additionalDetails?.property?.flatLoan },
          { label: "Land Owner", value: user.additionalDetails?.property?.landOwner },
          { label: "Land Address", value: user.additionalDetails?.property?.landAddress },
          { label: "Land Price", value: user.additionalDetails?.property?.landPrice },
          { label: "Land Loan", value: user.additionalDetails?.property?.landLoan },
          { label: "Farming Owner", value: user.additionalDetails?.property?.farmingOwner },
          { label: "Farming Address", value: user.additionalDetails?.property?.farmingAddress },
          { label: "Farming Price", value: user.additionalDetails?.property?.farmingPrice },
          { label: "Farming Loan", value: user.additionalDetails?.property?.farmingLoan },
          { label: "Shop Owner", value: user.additionalDetails?.property?.shopOwner },
          { label: "Shop Address", value: user.additionalDetails?.property?.shopAddress },
          { label: "Shop Price", value: user.additionalDetails?.property?.shopPrice },
          { label: "Shop Loan", value: user.additionalDetails?.property?.shopLoan },
          { label: "Other Property", value: user.additionalDetails?.property?.other },
        ]
      },
      {
        title: "Special Information",
        fields: [
          { label: "Qualities", value: user.additionalDetails?.special?.qualities },
          { label: "Specific Caste", value: user.additionalDetails?.special?.specificCaste },
          { label: "Likes", value: user.additionalDetails?.special?.likes },
          { label: "Dislikes", value: user.additionalDetails?.special?.dislikes },
          { label: "Intercaste", value: user.additionalDetails?.special?.intercaste },
          { label: "Hobbies", value: user.additionalDetails?.special?.hobbies },
          { label: "Lifestyle", value: user.additionalDetails?.special?.lifeStyle },
        ]
      },
      {
        title:"Occupation",
        fields:[
          {label: "Annual Income", value: user.additionalDetails?.occupation?.annualIncome},
          {label: "Employer Name", value: user.additionalDetails?.occupation?.employerName},
          {label:"Income Source", value: user.additionalDetails?.occupation?.incomeSource},
          {label: "Nature of Work", value: user.additionalDetails?.occupation?.natureWork},
          {label: "Completed Period", value: user.additionalDetails?.occupation?.completedPeriod},
          {label: "Other Sources", value: user.additionalDetails?.occupation?.otherSources},
          {label: "Financial Responsibility", value: user.additionalDetails?.occupation?.financialResponsibility},
          {label: "Member Responsibility", value: user.additionalDetails?.occupation?.memberResponsibility},

        ]
      },
      {
        title: "Relatives",
        fields:[
          {label:"First Relative", value: user.additionalDetails?.relatives?.firstRelativeName},
          {label:"First Relative Contact", value: user.additionalDetails?.relatives?.firstRelativeContact},
          {label:"First Relative Address", value: user.additionalDetails?.relatives?.firstRelativeAddress},
          {label:"First Relative Relation", value: user.additionalDetails?.relatives?.firstRelativeRelation},
          {label:"Second Relative", value: user.additionalDetails?.relatives?.secondRelativeName},
          {label:"Second Relative Contact", value: user.additionalDetails?.relatives?.secondRelativeContact},
          {label:"Second Relative Address", value: user.additionalDetails?.relatives?.secondRelativeAddress},
          {label:"Second Relative Relation", value: user.additionalDetails?.relatives?.secondRelativeRelation},
        ]
      }
    ];
  
    return (
      <div>
        <h1>User Details</h1>
        {user.image && <img src={user.image} className='w-40' alt={`${user.firstName || ''} ${user.lastName || ''}`.trim()} />}
        <p>

          <strong>Name:</strong> {user.firstName} {user.lastName}
          <br />
          <strong>Email:</strong> {user.email}
        </p> 
        {sections.map(section => renderSection(section.title, section.fields))}
      </div>
    );
  };
  
  


export default ProfileDetails;
