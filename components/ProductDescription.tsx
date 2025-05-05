"use client"

import { ProductDescription } from "@/types";
import React, { useState } from 'react';

interface Props {
    str: string
}

const ProductDescriptionComponent = ({ str }: Props) => {
    try {
        const description = JSON.parse(str) as ProductDescription
        const [expanded, setExpanded] = useState(false);
        const specifications = Object.entries(description.specifications) as [string, any][];
        const visibleSpecifications = expanded ? specifications : specifications.slice(0, 8);

        return (
            description?.features || description?.specifications ?
                <div className="flex flex-col gap-5">
                    <h3 className="text-2xl p-4 text-secondary font-semibold">
                        Product Description
                    </h3>

                    {
                        description.features ?
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h4 className="text-xl text-secondary font-semibold mb-4">Key features of the product</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    {description?.features?.map((feature, index) => (
                                        <li key={index} className="text-lg">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            :
                            <></>
                    }

                    {
                        description.specifications ?
                            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
                                <h4 className="text-xl text-secondary font-semibold mb-4">Product specifications</h4>
                                <div className="relative">
                                    <button onClick={() => setExpanded(!expanded)}
                                        className="absolute top-0 right-0 text-3xl font-semibold">
                                        {expanded ? '–' : '+'}
                                    </button>
                                    <table className="min-w-full table-auto border-collapse text-left">
                                        <tbody className="text-gray-700">
                                            {visibleSpecifications.map(([key, value], index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="px-4 py-2 font-semibold">{key}</td>
                                                    <td className="px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            <></>
                    }
                </div>
                :
                <></>
        );
    } catch (error) {
        console.error(`Error while parsing product description ${error}`);
        return <>
            <div className="flex flex-col gap-5">
                <h3 className="text-2xl ps-6 text-secondary font-semibold">
                    Product Description
                </h3>
                <div> {str} </div>
            </div>
        </>
    }
}

export default ProductDescriptionComponent;