import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import styled from "styled-components";
import { getEquipmentsByCategory, getEquipmentsCategories } from "../../services/DnDAPI/equipmentApi";

export default function Equipments() {
    const [equipmentsCategoriesList, setEquipmentsCategoriesList] = useState([]);
    const [categorizedEquipmentsCategories, setCategorizedEquipmentsCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categorizedEquipments, setCategorizedEquipments] = useState({});

    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            const queryParams = new URLSearchParams(location.search);
            const paramIndex = queryParams.get('index');

            if(paramIndex){
                setSelectedCategory(paramIndex);
                fetchDataByCategory(paramIndex);
            }

            const equipments = await getEquipmentsCategories();
            setEquipmentsCategoriesList(equipments);
        }
        fetchData();
    }, [location.search]);

    useEffect(() => {
        const categorized = categorizeEquipments(equipmentsCategoriesList);
        setCategorizedEquipmentsCategories(categorized);
    }, [equipmentsCategoriesList]);

    async function fetchDataByCategory(index){
        const equipments = await getEquipmentsByCategory(index);
        const categorized = categorizeEquipments(equipments.equipment);
        setCategorizedEquipments(categorized);
    }

    function categorizeEquipments(equipments) {
        const categorizedEquipments = {};

        equipments.forEach((equipment) => {
            const firstLetter = equipment.name.charAt(0).toUpperCase();
            if (!categorizedEquipments[firstLetter]) {
                categorizedEquipments[firstLetter] = [];
            }
            categorizedEquipments[firstLetter].push(equipment);
        });

        return categorizedEquipments;
    }
    return (
        <>
          <Header />
          <Container>
            {!selectedCategory ? (
              <>
                {Object.entries(categorizedEquipmentsCategories).map(([letter, equipmentCategory]) => (
                  <CategoryContainer key={letter}>
                    <MainHeading>{letter}</MainHeading>
                    <EquipmentGrid>
                      {equipmentCategory.map((category, index) => (
                        <EquipmentLink
                          key={index}
                          onClick={() => {
                            setSelectedCategory(category.index);
                            fetchDataByCategory(category.index);
                          }}
                          to={`/equipments?index=${category.index}`}
                        >
                          <EquipmentName>{category.name}</EquipmentName>
                        </EquipmentLink>
                      ))}
                    </EquipmentGrid>
                  </CategoryContainer>
                ))}
              </>
            ) : (
              <>
                {Object.entries(categorizedEquipments).map(([letter, equipment]) => (
                  <CategoryContainer key={letter}>
                    <MainHeading>{letter}</MainHeading>
                    <EquipmentGrid>
                      {equipment.map((equipment, index) => (
                        <EquipmentLink
                          key={index}
                          to={
                            equipment.url.includes("magic-items")
                              ? `/magic-item?index=${equipment.index}`
                              : `/equipment?index=${equipment.index}`
                          }
                        >
                          <EquipmentName>{equipment.name}</EquipmentName>
                        </EquipmentLink>
                      ))}
                    </EquipmentGrid>
                  </CategoryContainer>
                ))}
              </>
            )}
          </Container>
        </>
      );      
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CategoryContainer = styled.div`
  margin-left: 16px;
`;

const MainHeading = styled.h2`
  margin-top: 16px;
  margin-bottom: 16px;
  color: red;
  font-size: 2xl;
  font-weight: bold;
`;

const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
`;

const EquipmentLink = styled(Link)`
  padding: 16px;
  background-color: #ccc;
  border-radius: 4px;
`;

const EquipmentName = styled.p`
  color: #333;
`;