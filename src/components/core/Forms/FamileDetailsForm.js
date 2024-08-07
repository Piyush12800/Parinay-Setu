import React from 'react'
import ArrayFormTemplate from './ArrayFormTemplate'
import data from '../../../data/data2.json'
import FormSections from '../../Common/FormSections';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import { addFamilyDetails, updateFamilyDetails, getUserFamilyDetails } from '../../../services/operations/familyDetails'
const FamileDetailsForm = () => {
  return (
    <div className="w-full gap-[3rem] bg-white items-center flex flex-col text-center text-45xl text-black font-subheading">
      <Header />
      <FormSections />
      <ArrayFormTemplate
        fields={data.familyDetails.fields}
        createFunction={addFamilyDetails}
        updateFunction={updateFamilyDetails}
        getData={getUserFamilyDetails}
      />
      <Footer />
    </div>
  )
}

export default FamileDetailsForm
